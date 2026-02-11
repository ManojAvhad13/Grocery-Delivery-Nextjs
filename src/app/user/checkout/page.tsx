'use client'

import { RootState } from '@/redux/store'
import { ArrowLeft, Building, Home, LocateFixed, MapPin, Navigation, Phone, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useSelector } from 'react-redux'
import L, { LatLngExpression } from 'leaflet'
import "leaflet/dist/leaflet.css"

const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/14831/14831599.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const CheckoutPage = () => {

    const router = useRouter()

    const { userData } = useSelector((state: RootState) => state.user)
    const [address, setAddress] = useState({
        fullName: "",
        mobile: "",
        city: "",
        state: "",
        pincode: "",
        fullAdress: ""
    })

    const [position, setPosition] = useState<[number, number] | null>(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords
                setPosition([latitude, longitude])
            }, (err) => { console.log('location error', err) }, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 })
        }
    }, [])

    // when come user data then run this useEffect Hook
    useEffect(() => {
        if (userData) {
            setAddress((prev) => ({ ...prev, fullName: userData.name || "" }))
            setAddress((prev) => ({ ...prev, mobile: userData.mobile || "" }))
        }
    }, [userData])


    return (
        <div className='w-[92%] md:w-[80%] mx-auto py-10 relative'>
            <motion.button
                whileTap={{ scale: 0.98 }}

                className='absolute left-0 top-2 flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold'
                onClick={() => router.push("/user/cart")}
            >
                <ArrowLeft size={16} />
                <span>Back to cart</span>
            </motion.button>

            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}

                className='text-3xl md:text-4xl font-bold text-green-700 text-center mb-10'>
                Checkout</motion.h1>

            <div className='grid md:grid-cols-2 gap-8'>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}

                    className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100'
                >
                    <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                        <MapPin className='text-gray-700' /> Delivery Address
                    </h2>

                    <div className='space-y-4'>
                        <div className='relative'>
                            <User className='absolute left-3 top-3 text-green-600' size={18} />

                            {/* readOnly property using for not change name */}
                            <input type="text" value={address.fullName} onChange={(e) => setAddress((prev) => ({ ...prev, fullName: address.fullAdress }))}
                                className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                        </div>

                        <div className='relative'>
                            <Phone className='absolute left-3 top-3 text-green-600' size={18} />

                            {/* readOnly property using for not change name */}
                            <input type="text" value={address.mobile} onChange={(e) => setAddress((prev) => ({ ...prev, mobile: address.mobile }))}
                                className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                        </div>

                        <div className='relative'>
                            <Home className='absolute left-3 top-3 text-green-600' size={18} />

                            {/* readOnly property using for not change name */}
                            <input type="text" value={address.fullAdress} placeholder='Enter full address...' onChange={(e) => setAddress((prev) => ({ ...prev, fullAdress: address.fullAdress }))}
                                className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                        </div>

                        <div className='grid grid-cols-3 gap-3'>
                            <div className='relative'>
                                <Building className='absolute left-3 top-3 text-green-600' size={18} />

                                {/* readOnly property using for not change name */}
                                <input type="text" value={address.city} placeholder='city' onChange={(e) => setAddress((prev) => ({ ...prev, city: address.city }))}
                                    className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                            </div>

                            <div className='relative'>
                                <Navigation className='absolute left-3 top-3 text-green-600' size={18} />

                                {/* readOnly property using for not change name */}
                                <input type="text" value={address.state} placeholder='state' onChange={(e) => setAddress((prev) => ({ ...prev, state: address.state }))}
                                    className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                            </div>

                            <div className='relative'>
                                <LocateFixed className='absolute left-3 top-3 text-green-600' size={18} />

                                {/* readOnly property using for not change name */}
                                <input type="text" value={address.pincode} placeholder='pin code' onChange={(e) => setAddress((prev) => ({ ...prev, pincode: address.pincode }))}
                                    className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                            </div>
                        </div>
                        <div className='flex gap-2 mt-3'>
                            <input type="text" placeholder='seacrh city or area location...'
                                className='flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-gray-500 outline-none' />
                            <button className='bg-green-600 text-white px-5 rounded-lg hover:bg-gray-700 
                            transition-all font-medium'>Search</button>
                        </div>

                        <div className='relative mt-6 h-[330px] rounded-xl overflow-hidden border border-gray-200 shadow-inner'>
                            {position && <MapContainer center={position as LatLngExpression} zoom={13} scrollWheelZoom={true} className='w-full h-full'>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker icon={markerIcon} position={position} />

                            </MapContainer>}

                        </div>

                    </div>
                </motion.div>
            </div>

        </div>
    )
}

export default CheckoutPage
