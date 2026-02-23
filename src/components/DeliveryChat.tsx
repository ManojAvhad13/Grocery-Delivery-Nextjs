import { getSocket } from '@/lib/socket'
import { Send } from 'lucide-react'
import mongoose from 'mongoose'
import React, { useEffect, useState } from 'react'
type props = {
    orderId: mongoose.Types.ObjectId,
    deliveryBoyId: mongoose.Types.ObjectId
}

const DeliveryChat = ({ orderId, deliveryBoyId }: props) => {

    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        const socket = getSocket()
        socket.emit("join-room", orderId)
    }, [])

    const sendMessage = () => {
        const socket = getSocket()

        const message = {
            roomId: orderId,
            text: newMessage,
            senderId: deliveryBoyId,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })
        }

        socket.emit("send-message", message)
        setNewMessage("")
    }

    return (
        <div className='bg-white rounded-3xl shadow-lg border p-4 h-[430] flex flex-col'>
            <div className='flex gap-2 mt-3 border-t pt-3'>
                <input type="text" placeholder='Type a message...' className='flex-1 bg-gray-100 px-4 py-2 rounded-xl outline-none focus:ring-2
                focus:ring-green-500' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button className='bg-green-600 hover:bg-green-700 p-3 rounded-xl text-white' onClick={sendMessage}><Send size={18} /></button>
            </div>
        </div>
    )
}

export default DeliveryChat
