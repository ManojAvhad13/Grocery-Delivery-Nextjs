export const runtime = "nodejs";

import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const session = await auth()
        if (session?.user?.role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized: Admin access required" },
                { status: 403 }
            )
        }

        const formData = await req.formData()
        const name = formData.get("name") as string
        const category = formData.get("category") as string
        const unit = formData.get("unit") as string
        const price = formData.get("price") as string
        const file = formData.get("image") as File | null

        // Validate required fields
        // if (!name?.trim() || !category?.trim() || !unit?.trim() || !price?.trim()) {
        //     return NextResponse.json(
        //         { message: "All fields (name, category, unit, price) are required" },
        //         { status: 400 }
        //     )
        // }

        if (!name || !category || !unit || !price) {
            return NextResponse.json(
                { message: "All fields (name, category, unit, price) are required" },
                { status: 400 }
            );
        }

        // ✅ Enforce image (schema requires it)
        if (!file) {
            return NextResponse.json(
                { message: "Image is required" },
                { status: 400 }
            );
        }

        // let imageUrl

        // if (file) {
        //     const arrayBuffer = await file.arrayBuffer();
        //     const buffer = Buffer.from(arrayBuffer);
        //      const imageUrl = await uploadOnCloudinary(buffer);
        // }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageUrl = await uploadOnCloudinary(buffer);

        const grocery = await Grocery.create({
            name, category, unit, price, image: imageUrl,
        });

        return NextResponse.json(
            grocery,
            { status: 200 }
        )

    } catch (error: any) {
        console.error("ADD GROCERY ERROR:", error);
        return NextResponse.json(
            { message: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}