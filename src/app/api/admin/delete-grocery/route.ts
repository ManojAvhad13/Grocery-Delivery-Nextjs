export const runtime = "nodejs";

import { auth } from "@/auth";
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

        const { groceryId } = await req.json()
        const grocery = await Grocery.findByIdAndDelete(groceryId);

        return NextResponse.json(
            grocery,
            { status: 200 }
        )

    } catch (error: any) {
        console.error("delete grocery error:", error);
        return NextResponse.json(
            { message: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}