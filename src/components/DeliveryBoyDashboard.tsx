'use client'

import axios from "axios"
import { useEffect } from "react"

const DeliveryBoyDashboard = () => {

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const result = await axios.get("/api/delivery/get-assignments")
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAssignment()
    }, [])

    return (
        <div>
            Delivery Dasboard
        </div>
    )
}

export default DeliveryBoyDashboard
