'use client'

import React, { useState } from 'react'
import { motion } from "motion/react"
import { Bike, User, UserCog } from 'lucide-react'

const EditRoleMobile = () => {

    const [roles, setRoles] = useState([
        { id: "admin", label: "Admin", icon: UserCog },
        { id: "user", label: "User", icon: User },
        { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
    ])

    return (
        <div className='flex flex-col min-h-screen p-6 w-full bg-white'>
            <motion.h1
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

                className='text-3xl md:text-4xl font-extrabold text-green-700 text-center mt-8'

            >Select Your Role</motion.h1>

            <div className='flex flex-col md:flex-row justify-center items-center gap-6 mt-10'>
                {roles.map((role) => {
                    const Icon = role.icon
                    return (
                        <motion.div>
                            <Icon />
                            <span>{role.label}</span>
                        </motion.div>
                    )
                })}
            </div>

        </div>
    )
}

export default EditRoleMobile
