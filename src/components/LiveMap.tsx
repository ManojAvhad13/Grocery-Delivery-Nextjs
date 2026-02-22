"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import { Polyline, Popup } from "react-leaflet"

interface Ilocation {
    latitude: number
    longitude: number
}

interface Iprops {
    userLocation: Ilocation
    deliveryBoyLocation: Ilocation
}

const MapContainer = dynamic(
    () => import("react-leaflet").then(m => m.MapContainer),
    { ssr: false }
)
const TileLayer = dynamic(
    () => import("react-leaflet").then(m => m.TileLayer),
    { ssr: false }
)
const Marker = dynamic(
    () => import("react-leaflet").then(m => m.Marker),
    { ssr: false }
)

const LiveMap = ({ userLocation, deliveryBoyLocation }: Iprops) => {
    const [L, setL] = useState<any>(null)

    useEffect(() => {
        import("leaflet").then(setL)
    }, [])

    if (!L) return null

    const deliveryBoyIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/9561/9561839.png",
        iconSize: [45, 45]
    })

    const userIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/4821/4821951.png",
        iconSize: [45, 45]
    })

    const linePositions =
        deliveryBoyLocation && userLocation ?
            [
                [userLocation.latitude, userLocation.longitude],
                [deliveryBoyLocation.latitude, deliveryBoyLocation.longitude]
            ] : []


    const center: [number, number] = [userLocation.latitude, userLocation.longitude]

    return (
        <div className='w-full h-[500px] rounded-xl overflow-hidden shadow relative'>
            <MapContainer center={center} zoom={13} scrollWheelZoom className='w-full h-full'>
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center} icon={userIcon}>
                    <Popup>delivery Address</Popup>
                </Marker>
                {deliveryBoyLocation && <Marker position={[deliveryBoyLocation.latitude, deliveryBoyLocation.longitude]} icon={deliveryBoyIcon}>
                    <Popup>delivery Boy</Popup>
                </Marker>}
                <Polyline positions={linePositions as any} color='green' />
            </MapContainer>
        </div>
    )
}

export default LiveMap