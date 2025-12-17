"use client";
import Link from "next/link";
import { Compass, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Optional: Add scroll listener to change navbar style on scroll

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-600/20">
                        <Compass className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">
                        Explore<span className="text-blue-600">Now</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
                    <Link href="/" className="hover:text-blue-600 transition">Destinations</Link>
                    <Link href="/packages" className="hover:text-blue-600 transition">Trending</Link>
                    <Link href="/about" className="hover:text-blue-600 transition">About Us</Link>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <User className="w-4 h-4" />
                        Login
                    </Link>
                    <button className="md:hidden p-2 text-gray-600">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
}