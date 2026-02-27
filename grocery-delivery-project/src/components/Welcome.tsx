'use client'
import { motion } from "framer-motion"
import { ArrowRight, Leaf, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'

type propType = {
    nextStep: (s: number) => void
}

const Welcome = ({ nextStep }: propType) => {

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.2 } }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className='relative flex flex-col items-center justify-center min-h-screen text-center p-6 overflow-hidden bg-gradient-to-b from-green-100 via-white to-green-50'>

            {/* background blobs */}
            <div className='absolute w-72 h-72 bg-green-200 rounded-full blur-3xl top-10 left-10 opacity-40'></div>
            <div className='absolute w-72 h-72 bg-orange-200 rounded-full blur-3xl bottom-10 right-10 opacity-40'></div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className='z-10 flex flex-col items-center max-w-3xl'
            >

                {/* Heading */}
                <motion.div variants={item} className='flex items-center gap-3'>
                    <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent'>
                        Welcome to Grocery App
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={item}
                    className='mt-4 text-gray-700 text-lg md:text-xl'
                >
                    Shop fresh groceries and daily essentials easily with our app.
                    Enjoy quality products, great deals, and fast doorstep delivery.
                </motion.p>

                {/* Feature cards */}
                <motion.div
                    variants={item}
                    className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full'
                >
                    {/* Fresh & Quality */}
                    <div className='bg-white/70 backdrop-blur p-5 rounded-xl shadow hover:shadow-lg transition'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-green-100'>
                                <Leaf className='text-green-700 w-5 h-5' />
                            </div>
                            <h3 className='font-semibold text-green-700'>Fresh & Quality</h3>
                        </div>
                        <p className='text-sm text-gray-600 mt-3'>
                            Farm-fresh fruits, vegetables, dairy & organic items.
                        </p>
                    </div>

                    {/* Fast Delivery */}
                    <div className='bg-white/70 backdrop-blur p-5 rounded-xl shadow hover:shadow-lg transition'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-orange-100'>
                                <Truck className='text-orange-600 w-5 h-5' />
                            </div>
                            <h3 className='font-semibold text-green-700'>Fast Delivery</h3>
                        </div>
                        <p className='text-sm text-gray-600 mt-3'>
                            Same-day doorstep delivery with real-time tracking.
                        </p>
                    </div>

                    {/* Secure Payments */}
                    <div className='bg-white/70 backdrop-blur p-5 rounded-xl shadow hover:shadow-lg transition'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-100'>
                                <ShieldCheck className='text-blue-600 w-5 h-5' />
                            </div>
                            <h3 className='font-semibold text-green-700'>Secure Payments</h3>
                        </div>
                        <p className='text-sm text-gray-600 mt-3'>
                            UPI, cards & COD with safe checkout experience.
                        </p>
                    </div>
                </motion.div>

                {/* small trust text */}
                <motion.p
                    variants={item}
                    className='mt-6 text-sm text-gray-500'
                >
                    Trusted by thousands of customers for convenient and affordable grocery shopping.
                </motion.p>

                {/* button */}
                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='group inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-8 mt-8 rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden'
                    onClick={() => nextStep(2)}
                >
                    <span className='absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition'></span>
                    Start Shopping
                    <ArrowRight className='group-hover:translate-x-1 transition' />
                </motion.button>

            </motion.div>
        </div>
    )
}

export default Welcome