'use client'

import { RootState } from '@/redux/store'
import { ArrowLeft, Building, Home, Loader2, LocateFixed, LocateFixedIcon, MapPin, Navigation, Phone, User } from 'lucide-react'
import { motion, scale } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'
import L, { LatLngExpression } from 'leaflet'
import "leaflet/dist/leaflet.css"
import axios from 'axios'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

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

    const [searchLoading, setSearchLoading] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")

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

    const DraggableMarker: React.FC = () => {

        const map = useMap()

        useEffect(() => {
            map.setView(position as LatLngExpression, 15, { animate: true })
        }, [position, map])

        return <Marker icon={markerIcon}
            position={position as LatLngExpression}
            draggable={true}
            eventHandlers={{
                dragend: (e: L.LeafletEvent) => {
                    const marker = e.target as L.Marker
                    const { lat, lng } = marker.getLatLng()
                    setPosition([lat, lng])
                }
            }}
        />
    }

    const handleSearchQuery = async () => {
        setSearchLoading(true)
        const provider = new OpenStreetMapProvider()
        const results = await provider.search({ query: searchQuery });
        // console.log(results)
        if (results) {
            setSearchLoading(false)
            setPosition([results[0].y, results[0].x])
        }
    }

    useEffect(() => {
        const fetchAddress = async () => {
            if (!position) return
            try {
                const result = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`)
                // console.log(result.data)
                setAddress(prev => ({
                    ...prev,
                    city: result.data.address.city,
                    state: result.data.address.state,
                    pincode: result.data.address.postcode,
                    fullAdress: result.data.display_name,
                }))
            } catch (error) {
                console.log(error)
            }
        }
        fetchAddress()
    }, [position])

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords
                setPosition([latitude, longitude])
            }, (err) => { console.log('location error', err) }, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 })
        }
    }

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
                            <input type="text" value={address.fullName} onChange={(e) => setAddress((prev) => ({ ...prev, fullName: e.target.value }))}
                                className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                        </div>

                        <div className='relative'>
                            <Phone className='absolute left-3 top-3 text-green-600' size={18} />

                            {/* readOnly property using for not change name */}
                            <input type="text" value={address.mobile} onChange={(e) => setAddress((prev) => ({ ...prev, mobile: e.target.value }))}
                                className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                        </div>

                        <div className='relative'>
                            <Home className='absolute left-3 top-3 text-green-600' size={18} />

                            {/* readOnly property using for not change name */}
                            <input type="text" value={address.fullAdress} placeholder='Enter full address...' onChange={(e) => setAddress((prev) => ({ ...prev, fullAdress: e.target.value }))}
                                className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                        </div>

                        <div className='grid grid-cols-3 gap-3'>
                            <div className='relative'>
                                <Building className='absolute left-3 top-3 text-green-600' size={18} />

                                {/* readOnly property using for not change name */}
                                <input type="text" value={address.city} placeholder='city' onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                                    className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                            </div>

                            <div className='relative'>
                                <Navigation className='absolute left-3 top-3 text-green-600' size={18} />

                                {/* readOnly property using for not change name */}
                                <input type="text" value={address.state} placeholder='state' onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value }))}
                                    className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                            </div>

                            <div className='relative'>
                                <LocateFixed className='absolute left-3 top-3 text-green-600' size={18} />

                                {/* readOnly property using for not change name */}
                                <input type="text" value={address.pincode} placeholder='pin code' onChange={(e) => setAddress((prev) => ({ ...prev, pincode: e.target.value }))}
                                    className='pl-10 w-full border rounded-lg p-3 text-sm  bg-gray-50' />
                            </div>
                        </div>
                        <div className='flex gap-2 mt-3'>
                            <input type="text" placeholder='seacrh city or area location...'
                                className='flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-gray-500 outline-none' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <button className='bg-green-600 text-white px-5 rounded-lg hover:bg-gray-700 
                            transition-all font-medium' onClick={handleSearchQuery}>{searchLoading ? <Loader2 size={16} className='animate-spin' /> : "Search"}</button>
                        </div>

                        <div className='relative mt-6 h-[330px] rounded-xl overflow-hidden border border-gray-200 shadow-inner'>
                            {position && <MapContainer center={position as LatLngExpression} zoom={13} scrollWheelZoom={true} className='w-full h-full'>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <DraggableMarker />

                            </MapContainer>}

                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                className='absolute bottom-4 right-4 bg-green-600 text-white shadow-lg rounded-lg p-3 hover:bg-green-700
                            transition-all flex items-center justify-center z-[999]'
                                onClick={handleCurrentLocation}
                            >
                                <LocateFixedIcon size={22} />
                            </motion.button>

                        </div>

                    </div>
                </motion.div>
            </div>

        </div>
    )
}

export default CheckoutPage
