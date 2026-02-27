'use client'

import { ArrowRight, Check, CheckCircle, Package } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

const page = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-gradient-to-b from-green-50 to-white'>
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    type: "spring",
                    damping: 10,
                    stiffness: 100
                }}
                className="relative"
            >
                <CheckCircle className="text-green-600 w-4 h-4 md:w-28 md:h-28" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-green-700 mt-6"
            >
                Order Placed Successfully
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}

                className="text-gray-600 mt-3 text-sm md:text-base mx-w-md"
            >
                Thank you  for shopping with us! Your order has been placed and is being processed.
                <br />you can track its progress in your <span className="font-bold text-green-700">My Orders</span> section.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}

                className="mt-12"
            >
                <Link href={"/user/my-orders"}>
                    <motion.div

                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}

                        className="flex  items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-base font-semibold
                    px-8 py-3 rounded-full shadow-lg transition-all"
                    >
                        Go to My Order Page <ArrowRight />
                    </motion.div>
                </Link>
            </motion.div>

            {/* dot blink */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
            >
                <div className="absolute bottom-80 left-[50%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
            </motion.div>
        </div>
    )
}

export default page
