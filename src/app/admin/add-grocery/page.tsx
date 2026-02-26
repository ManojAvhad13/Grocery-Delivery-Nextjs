'use client'

import { ArrowLeft, Plus, Upload } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

// Fixed typos in category names
const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Rice, Atta & Grains",
    "Snacks & Biscuits",
    "Spices & Masalas",
    "Beverages & Drinks",
    "Personal Care",
    "Household Essentials",
    "Instant & Packaged Food",
    "Baby & Pet Care",
]

const units = [
    "kg", "g", "liter", "ml", "piece", "pack"
]

const AddGrocery = () => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState("")
    const [preview, setPreview] = useState<string | null>(null)
    const [backendImage, setBackendImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return
        const file = files[0]
        setBackendImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)
        setLoading(true)

        // Validate required fields
        if (!name.trim() || !category.trim() || !unit.trim() || !price.trim()) {
            setError("All fields are required")
            setLoading(false)
            return
        }

        // Validate price is positive
        if (Number(price) <= 0) {
            setError("Price must be greater than 0")
            setLoading(false)
            return
        }

        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("category", category)
            formData.append("price", price)
            formData.append("unit", unit)
            if (backendImage) {
                formData.append("image", backendImage)
            }

            const result = await axios.post("/api/admin/add-grocery", formData)
            console.log("Success:", result.data)

            // Reset form on success
            setName("")
            setCategory("")
            setUnit("")
            setPrice("")
            setPreview(null)
            setBackendImage(null)
            setSuccess(true)
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000)

        } catch (error: any) {
            console.error("Error adding grocery:", error)
            const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again."
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white py-16 px-4 relative'>

            <Link href={"/"} className='absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2
            rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all'>
                <ArrowLeft className='w-5 h-5' />
                <span className='hidden md:flex'>Back to home</span>
            </Link>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className='bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8'
            >

                <div className='flex flex-col items-center mb-8'>
                    <div className='flex items-center gap-3'>
                        <Plus className='text-green-600 w-8 h-8' />
                        <h1 className='text-2xl font-bold text-gray-800'>Add Your Grocery</h1>
                    </div>
                    <p className='text-gray-500 text-sm mt-2 text-center'>Fill out details below to add a new grocery item.</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className='mb-6 p-4 bg-red-50 border border-red-300 rounded-xl text-red-700 text-sm'>
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className='mb-6 p-4 bg-green-50 border border-green-300 rounded-xl text-green-700 text-sm'>
                        ✓ Grocery added successfully!
                    </div>
                )}

                <form className='flex flex-col gap-6 w-full' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name' className='block text-gray-700 font-medium mb-1'>Grocery Name <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            id='name'
                            required
                            placeholder='eg: sweets, milk...'
                            className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        <div>
                            <label className='block text-gray-700 font-medium mb-1'>Category <span className='text-red-500'>*</span></label>
                            <select
                                required
                                name="category"
                                value={category}
                                className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white'
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat, i) => (
                                    <option key={i} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className='block text-gray-700 font-medium mb-1'>Unit <span className='text-red-500'>*</span></label>
                            <select
                                required
                                name="unit"
                                value={unit}
                                className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white'
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                <option value="">Select Unit</option>
                                {units.map(u => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='price' className='block text-gray-700 font-medium mb-1'>Price <span className='text-red-500'>*</span></label>
                        <input
                            type="number"
                            id='price'
                            required
                            value={price}
                            placeholder='eg: 150'
                            className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all'
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col sm:flex-row items-center gap-5'>
                        <label htmlFor='image' className='cursor-pointer flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold border border-green-200 rounded-xl px-6 py-3 hover:bg-green-100 transition-all w-full sm:w-auto'>
                            <Upload className='w-5 h-5' />
                            Upload Image
                        </label>

                        <input type="file" accept='image/*' id='image' hidden onChange={handleImageChange} />

                        {preview && (
                            <div className="relative w-24 h-24">
                                <Image
                                    src={preview}
                                    alt='grocery preview'
                                    fill
                                    className='rounded-xl shadow-md border border-gray-200 object-cover'
                                />
                            </div>
                        )}
                    </div>

                    <motion.button
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='mt-4 w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2'
                    >
                        {loading ? "Adding..." : "Add Grocery"}
                    </motion.button>

                </form>
            </motion.div>
        </div>
    )
}

export default AddGrocery