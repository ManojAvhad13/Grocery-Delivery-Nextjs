'use client'

import { IUser } from '@/models/user.model'
import { RootState } from '@/redux/store'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import mongoose from 'mongoose'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface IOrder {
    _id?: mongoose.Types.ObjectId
    user: mongoose.Types.ObjectId
    items: [
        {
            grocery: mongoose.Types.ObjectId
            name: string,
            price: string,
            unit: string,
            image: string,
            quantity: number,
        }
    ],

    isPaid: boolean,

    totalAmount: number,
    paymentMethod: "cod" | "online",
    address: {
        fullName: string,
        mobile: string,
        city: string,
        state: string,
        pincode: string,
        fullAddress: string,
        latitude: number,
        longitude: number,
    }

    assignment?: mongoose.Types.ObjectId
    assignedDeliveryBoy?: IUser

    status: "pending" | "out of delivery" | "delivered",

    createdAt?: Date
    updatedAt?: Date
}

interface Ilocation {
    latitude: number,
    longitude: number
}

const TrackOrder = ({ params }: { params: { orderId: string } }) => {

    const { userData } = useSelector((state: RootState) => state.user)

    const { orderId } = useParams()

    const [order, setOrder] = useState<IOrder>()
    const [userLocation, setUserLocation] = useState<Ilocation>(
        {
            latitude: 0,
            longitude: 0
        }
    )
    const [deliveryBoyLocation, setDeliveryBoyLocation] = useState<Ilocation>(
        {
            latitude: 0,
            longitude: 0
        }
    )

    useEffect(() => {
        const getOrder = async () => {
            try {
                const result = await axios.get(`/api/user/get-order/${orderId}`)
                // console.log(result)
                setOrder(result.data)
                setUserLocation({
                    latitude: result.data.address.latitude,
                    longitude: result.data.address.longitude
                })
                setDeliveryBoyLocation({
                    latitude: result.data.assignedDeliveryBoy.location.coordinates[1],
                    longitude: result.data.assignedDeliveryBoy.location.coordinates[0]
                })
            } catch (error) {
                console.log(error)
            }
        }
        getOrder()
    }, [userData?._id])

    return (
        <div className='w-full min-h-screen bg-linear-to-b from-green-50 to-white'>
            <div className='max-w-2xl mx-auto pb-24'>
                <div>
                    <button><ArrowLeft /></button>
                    <div>
                        <h2>Track Order</h2>
                        <p>order #{order?._id?.toString().slice(-6)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackOrder
