'use client'

import { ArrowLeft, EyeIcon, EyeOff, Leaf, Loader2, LockKeyhole, LogIn, Mail, ShieldCheck, Truck, User } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import googleImage from "@/assets/google.png"
import axios from "axios"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"

type propType = {
    previousStep: (s: number) => void
}

const RegisterForm = ({ previousStep }: propType) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post("/api/auth/register", { name, email, password })
            toast.success("Register Successfully ✅", {
                icon: "🛒",
                duration: 2000
            })
            router.push("/login")
        } catch (error) {
            console.log(error)
            toast.error("Registration failed ❌")
        } finally {
            setLoading(false)
        }
    }

    const formValidation = name !== "" && email !== "" && password !== ""

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gradient-to-b from-green-100 via-white to-green-50 overflow-hidden">

            {/* blobs like welcome */}
            <div className='absolute w-72 h-72 bg-green-200 rounded-full blur-3xl top-10 left-10 opacity-40'></div>
            <div className='absolute w-72 h-72 bg-orange-200 rounded-full blur-3xl bottom-10 right-10 opacity-40'></div>

            {/* back */}
            <div className="absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer"
                onClick={() => previousStep(1)}>
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
            </div>

            {/* heading */}
            <motion.h1
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-extrabold text-green-700 mb-2 z-10"
            >
                Create Account
            </motion.h1>

            <p className="text-gray-600 mb-6 flex items-center gap-2 z-10">
                Join Grocery app and enjoy fresh groceries delivered fast
                <Leaf className="w-5 h-5 text-green-600" />
            </p>

            {/* glass form */}
            <motion.form
                onSubmit={handleRegister}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-5 w-full max-w-sm bg-white/70 backdrop-blur p-6 rounded-2xl shadow-lg z-10"
            >

                {/* name */}
                <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Enter Your Name..."
                        className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                {/* email */}
                <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Enter Your Email..."
                        className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                {/* password */}
                <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password..."
                        className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-10 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {showPassword
                        ? <EyeOff className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
                        : <EyeIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
                    }
                </div>

                {/* register btn */}
                <button
                    type="submit"
                    disabled={!formValidation || loading}
                    className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2
                    ${formValidation ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register"}
                </button>

                {/* OR */}
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="flex-1 h-px bg-gray-200"></span>
                    OR
                    <span className="flex-1 h-px bg-gray-200"></span>
                </div>

                {/* google */}
                <div
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200 cursor-pointer"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                    <Image src={googleImage} width={20} height={20} alt="googleimg" />
                    Continue with Google
                </div>

                {/* trust info */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Fast Delivery</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Secure</span>
                </div>

            </motion.form>

            {/* login */}
            <p className="cursor-pointer font-semibold text-gray-600 mt-6 text-sm flex items-center gap-1 z-10"
                onClick={() => router.push("/login")}>
                Already have an account ?
                <LogIn className="w-4 h-4" />
                <span className="text-green-600">Sign in</span>
            </p>
        </div>
    )
}

export default RegisterForm