'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const iconVariants = {
    hover: {
        scale: 1.2,
        y: -4,
        transition: { type: "spring", stiffness: 300 }
    }
}

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white mt-20"
        >
            <div className="w-[90%] md:w-[80%] mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-green-500/40">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">GroceryCart Delivery</h2>
                    <p className="text-sm text-green-100 leading-relaxed">
                        Your one-stop online grocery store delivering freshness to your doorstep.
                    </p>

                    {/* ⭐ Social icons */}
                    <div className="flex gap-4 mt-5">
                        {[
                            { icon: <FaFacebookF />, link: "https://www.facebook.com/" },
                            { icon: <FaInstagram />, link: "https://www.instagram.com/" },
                            { icon: <FaTwitter />, link: "https://twitter.com/" },
                            { icon: <FaYoutube />, link: "https://www.youtube.com/" }
                        ].map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.link}
                                target="_blank"
                                whileHover="hover"
                                className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition shadow-lg"
                                aria-label="social link"
                            >
                                {item.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-green-100">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/user/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm text-green-100">
                        <li>Email: support@grocerydelivery.com</li>
                        <li>Phone: +91 1234567890</li>
                        <li>Address: Nashik, Maharashtra, India</li>
                    </ul>
                </div>
            </div>

            <div className="text-center py-5 text-sm text-green-200">
                © {new Date().getFullYear()} Grocery Delivery. All rights reserved.
            </div>
        </motion.footer>
    )
}

export default Footer