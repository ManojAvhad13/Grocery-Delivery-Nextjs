'use client'

import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-[90%] md:w-[70%] mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Contact Us
                    </h1>
                    <p className="text-green-100 text-lg">
                        We’d love to hear from you! Get in touch with us anytime.
                    </p>
                </motion.div>
            </section>

            {/* Contact Info + Form */}
            <section className="w-[90%] md:w-[80%] mx-auto py-16 grid md:grid-cols-2 gap-12">

                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                        <FaPhoneAlt className="text-green-600 text-xl mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg">Phone</h3>
                            <p className="text-gray-600">+91 1234567890</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                        <FaEnvelope className="text-green-600 text-xl mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <p className="text-gray-600">support@grocerydelivery.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                        <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg">Address</h3>
                            <p className="text-gray-600">Nashik, Maharashtra, India</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-8 rounded-xl shadow-lg space-y-6"
                >
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Write your message..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Send Message
                    </button>
                </motion.form>
            </section>

            {/* Map Section */}
            <section className="w-[90%] md:w-[80%] mx-auto pb-20">
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        src="https://maps.google.com/maps?q=Nashik&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-[400px]"
                        loading="lazy"
                    ></iframe>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default ContactPage