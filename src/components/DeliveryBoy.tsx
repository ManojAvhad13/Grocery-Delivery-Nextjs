import React from 'react'
import DeliveryBoyDashboard from './DeliveryBoyDashboard'
import { auth } from '@/auth'
import connectDb from '@/lib/db'
import Order from '@/models/order.model'

const DeliveryBoy = async () => {

    await connectDb()
    const session = await auth()
    const DeliveryBoyId = session?.user?.id
    const orders = await Order.find({
        assignedDeliveryBoy: DeliveryBoyId,
        deliveryOtpVerification: true
    })

    const today = new Date().toDateString()
    const todayOrders = orders.filter((o) => new Date(o.deliveredAt).toString() === today).length
    const todayEarning = todayOrders * 40

    return (
        <>
            <DeliveryBoyDashboard earning={todayEarning} />
        </>
    )
}

export default DeliveryBoy
