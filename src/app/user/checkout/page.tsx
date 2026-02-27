'use client'

import { RootState } from '@/redux/store'
import { ArrowLeft, Banknote, Building, CreditCard, CreditCardIcon, Home, Loader2, LocateFixed, LocateFixedIcon, MapPin, Navigation, Phone, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios'
import dynamic from 'next/dynamic'
const CheckoutMap = dynamic(() => import("@/components/CheckoutMap"), { ssr: false })



const CheckoutPage = () => {

    const router = useRouter()

    const { userData } = useSelector((state: RootState) => state.user)
    const { subTotal, deliveryFee, finalTotal, cartData } = useSelector((state: RootState) => state.cart)

    const [address, setAddress] = useState({
        fullName: "",
        mobile: "",
        city: "",
        state: "",
        pincode: "",
        fullAddress: ""
    })

    const [searchLoading, setSearchLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [position, setPosition] = useState<[number, number] | null>(null)

    const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod")

    // Get current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords
                setPosition([latitude, longitude])
            }, (err) => { console.log('location error', err) }, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 })
        }
    }, [])

    // when come user data then run this useEffect Hook
    // Auto-fill user data
    useEffect(() => {
        if (userData) {
            setAddress((prev) => ({ ...prev, fullName: userData.name || "" }))
            setAddress((prev) => ({ ...prev, mobile: userData.mobile || "" }))
        }
    }, [userData])



    const handleSearchQuery = async () => {
        setSearchLoading(true)
        const { OpenStreetMapProvider } = await import("leaflet-geosearch")
        const provider = new OpenStreetMapProvider()
        const results = await provider.search({ query: searchQuery });
        // console.log(results)
        if (results && results.length > 0) {
            setSearchLoading(false)
            setPosition([results[0].y, results[0].x])
        } else {
            alert("Location not found")
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
                    city: result.data.address.city ||
                        result.data.address.town ||
                        result.data.address.village ||
                        "",
                    state: result.data.address.state || "",
                    pincode: result.data.address.postcode || "",
                    fullAddress: result.data.display_name || "",
                }))
            } catch (error) {
                console.log(error)
            }
        }
        fetchAddress()
    }, [position])

    const handleCod = async () => {

        if (!position) {
            alert("Please select delivery location")
            return
        } else {
            null
        }

        try {
            const result = await axios.post("/api/user/order", {
                userId: userData?._id,
                items: cartData.map(item => ({
                    grocery: item._id,
                    name: item.name,
                    price: item.price,
                    unit: item.unit,
                    quantity: item.quantity,
                    image: item.image
                }
                )),
                totalAmount: finalTotal,
                address: {
                    fullName: address.fullName,
                    mobile: address.mobile,
                    city: address.city,
                    state: address.state,
                    fullAddress: address.fullAddress,
                    pincode: address.pincode,
                    latitude: position[0],
                    longitude: position[1]
                },
                paymentMethod
            })

            // console.log(result.data)
            router.push("/user/order-success")

        } catch (error) {
            console.log(error)
        }
    }

    const handleOnline = async () => {

        if (!position) {
            alert("Please select delivery location")
            return
        }

        try {
            // Create a payment session on the server which should return a redirect URL
            const result = await axios.post('/api/user/payment', {
                userId: userData?._id,
                items: cartData.map(item => ({
                    grocery: item._id,
                    name: item.name,
                    price: item.price,
                    unit: item.unit,
                    quantity: item.quantity,
                    image: item.image
                })),
                totalAmount: finalTotal,
                address: {
                    fullName: address.fullName,
                    mobile: address.mobile,
                    city: address.city,
                    state: address.state,
                    fullAddress: address.fullAddress,
                    pincode: address.pincode,
                    latitude: position[0],
                    longitude: position[1]
                },
                paymentMethod: 'online'
            })

            // Expect the server to respond with a URL to redirect the user to (eg. Stripe Checkout)
            if (result.data && result.data.url) {
                window.location.href = result.data.url
            } else {
                console.log('No redirect URL returned from payment session')
            }

        } catch (error) {
            console.log(error)
        }
    }

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
                            <input type="text" value={address.fullAddress} placeholder='Enter full address...' onChange={(e) => setAddress((prev) => ({ ...prev, fullAddress: e.target.value }))}
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
                            {position && <CheckoutMap position={position} setPosition={setPosition} />}

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

                {/* right div */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}

                    className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
                    p-6 border border-gray-100 h-fit'
                >
                    <h2 className='text-xl font-semibold text-gray-800 mb-4 flex 
                    items-center gap-2'><CreditCard className='text-green-600' /> Payment Method</h2>
                    <div className='space-y-4 mb-6'>
                        <button onClick={() => setPaymentMethod("online")} className={`flex items-center gap-3 w-full border rounded-lg p-3 transition-all
                            ${paymentMethod === "online"
                                ? "border-gray-600 bg-green-50 shadow-sm"
                                : "hover:bg-gray-50"
                            }`}>
                            <CreditCardIcon className='text-green-600' /> <span className='font-medium text-gray-700'>Pay Online (Stripe)</span>
                        </button>

                        <button onClick={() => setPaymentMethod("cod")} className={`flex items-center gap-3 w-full border rounded-lg p-3 transition-all
                            ${paymentMethod === "cod"
                                ? "border-gray-600 bg-green-50 shadow-sm"
                                : "hover:bg-gray-50"
                            }`}>
                            <Banknote className='text-green-600' /> <span className='font-medium text-gray-700'>Cash on Delivery</span>
                        </button>
                    </div>

                    <div className='border-t pt-4 text-gray-700 space-y-2 text-sm sm:text-base'>
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Subtotal</span>
                            <span className='font-semibold text-green-600'>₹{subTotal}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Delivery Fee</span>
                            <span className='font-semibold text-green-600'>₹{deliveryFee}</span>
                        </div>
                        <div className='flex justify-between font-bold text-lg border-t pt-3'>
                            <span className='font-semibold'>Final Total</span>
                            <span className='font-semibold text-green-600'>₹{finalTotal}</span>
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        className='w-full mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-all font-semibold'
                        onClick={() => {
                            if (paymentMethod === "cod") {
                                handleCod()
                            } else if (paymentMethod === "online") {
                                handleOnline()
                            }
                        }}
                    >
                        {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
                    </motion.button>

                </motion.div>

            </div>

        </div>
    )
}

export default CheckoutPage
