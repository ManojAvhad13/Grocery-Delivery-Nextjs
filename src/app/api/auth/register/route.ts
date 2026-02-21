import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        // const { name, email, password } = await req.json()
        const body = await req.json()
        const { name, email, password } = body

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields required" },
                { status: 400 }
            )
        }

        // Find user email

        const existUser = await User.findOne({ email: email.toLowerCase() })
        if (existUser) {
            return NextResponse.json(
                { message: "email already exist!" },
                { status: 400 }
            )
        }

        // Password Length

        if (password.length < 6) {
            return NextResponse.json(
                { message: "password must be atleast 6 characters" },
                { status: 400 }
            )
        }

        // Hashed Password

        const hashedPassword = await bcrypt.hash(password, 10)

        // Create User
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        })

        return NextResponse.json(
            {
                message: "User created",
                user: { id: user._id, name: user.name, email: user.email }
            },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: `register error ${error}` },
            { status: 500 }
        )
    }
}