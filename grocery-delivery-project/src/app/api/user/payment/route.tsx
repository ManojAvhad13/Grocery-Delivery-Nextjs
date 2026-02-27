import connectDb from "@/lib/db"
import Order from "@/models/order.model"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
    try {
        await connectDb()

        const { userId, items, paymentMethod, totalAmount, address } =
            await req.json()

        // ✅ Validate data
        if (!userId || !items || !paymentMethod || !totalAmount || !address) {
            return NextResponse.json(
                { message: "Please send all required data" },
                { status: 400 }
            )
        }

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { message: "Items must be a non-empty array" },
                { status: 400 }
            )
        }

        const user = await User.findById(userId)

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        // ✅ Create Order (status pending)
        const newOrder = await Order.create({
            user: userId,
            items,
            paymentMethod,
            totalAmount,
            address,
            paymentStatus: "pending"
        })

        // ✅ Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.NEXT_BASE_URL}/user/order-success?orderId=${newOrder._id}`,
            cancel_url: `${process.env.NEXT_BASE_URL}/user/order-cancel`,
            line_items: items.map((item: any) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name || "Grocery Item",
                    },
                    unit_amount: Math.round(Number(item.price) * 100),
                },
                quantity: Number(item.quantity) || 1,
            })),
            metadata: {
                orderId: newOrder._id.toString(),
            },
        })

        return NextResponse.json(
            { url: session.url },
            { status: 200 }
        )

    } catch (error: any) {
        console.error("Stripe Payment Error:", error)
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}