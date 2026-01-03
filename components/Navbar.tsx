"use client";

import Link from "next/link";
import { Compass, User, Menu, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
    const { data: session, status } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const role = session?.user?.role;

    function getDashboardLink() {
        if (role === "admin") return "/admin/dashboard";
        if (role === "guide") return "/guide/dashboard";
        return "/user/dashboard";
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition shadow-lg shadow-blue-600/20">
                        <Compass className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                        Explore<span className="text-blue-600">Now</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
                    <Link href="/" className="hover:text-blue-600">Destinations</Link>
                    <Link href="/packages" className="hover:text-blue-600">Trending</Link>
                    <Link href="/about" className="hover:text-blue-600">About Us</Link>

                    {session && (
                        <Link
                            href={getDashboardLink()}
                            className="hover:text-blue-600 font-bold"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {status === "loading" ? null : !session ? (
                        <Link
                            href="/login"
                            className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition shadow"
                        >
                            <User className="w-4 h-4" />
                            Login
                        </Link>
                    ) : (
                        <div className="hidden md:flex items-center gap-4">
                            <span className="text-sm text-gray-700 font-medium">
                                {session.user.name}
                            </span>
                            <button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
                    <Link href="/" className="block text-gray-700">Destinations</Link>
                    <Link href="/packages" className="block text-gray-700">Trending</Link>
                    <Link href="/about" className="block text-gray-700">About</Link>

                    {!session ? (
                        <Link href="/login" className="block text-blue-600 font-bold">
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={getDashboardLink()}
                                className="block text-blue-600 font-bold"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="block text-red-500"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
