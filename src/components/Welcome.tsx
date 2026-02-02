'use client'
import React from 'react'
import { motion } from "motion/react"
import { ArrowRight, Bike, ShoppingBag, ShoppingCart } from 'lucide-react'

type propType = {
    nextStep: (s: number) => void
}

const Welcome = ({ nextStep }: propType) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-linear-to-b from-green-100 to-white'>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.6
                }}
                className='flex items-center gap-3'
            >
                <ShoppingCart className='w-10 h-10 text-green-700' />
                <h1 className='text-4xl md:text-5xl font-extrabold text-green-700'>Welcome to Grocery app</h1>
            </motion.div>

            <motion.p
                initial={{
                    opacity: 0,
                    y: 10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.6,
                    delay: 0
                }}

                className='mt-4 text-grey-700 text-lg md:text-xl max-w-lg'

            >
                Your one-stop destination for fresh groceries, organic produce,
                and daily essentials delivered right to your doorstep
            </motion.p>

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.9
                }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}

                transition={{
                    duration: 0.6,
                    delay: 0.5
                }}

                className='flex items-centre justify-center gap-8 mt-8'
            >
                <ShoppingBag className='w-24 h-24 md:w-32 md:h-32 text-green-700 drop-shadow-md' />
                <Bike className='w-24 h-24 md:w-32 md:h-32 text-orange-700 drop-shadow-md' />

            </motion.div>

            <motion.button
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.6,
                    delay: 0.6
                }}

                className='inline-flex items-center gap-2 bg-green-700 hover:bg-green-700 text-white font-semobold py-3 px-8 mt-7 rounded-2xl shadow-md transition-all duration-200'
                onClick={() => nextStep(2)}
            >
                Next
                <ArrowRight />
            </motion.button>

        </div>
    )
}

export default Welcome
