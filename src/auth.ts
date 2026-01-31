import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, request) {

                await connectDb()
                const email = credentials.email
                const password = credentials.password as string
                const user = await User.findOne({ email })

                if (!user) {
                    throw new Error("user does not exist")
                }

                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    throw new Error("incorrect password")
                }

                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    // role: user.role,

                }
            },
        })
    ],
})


// connectDb
// email check
// password match
