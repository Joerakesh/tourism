import Link from "next/link";
import {
    Compass, Facebook, Twitter, Instagram, Linkedin,
    Mail, Phone, MapPin, ArrowRight
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                                <Compass className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">
                                Explore<span className="text-blue-600">Now</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Discover the best destinations in India with our curated travel packages. We make your journey memorable and hassle-free.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="/about" className="hover:text-blue-600 transition">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-blue-600 transition">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600 transition">Travel Blog</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6">Contact</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                                <span>123 Tourism Street, Tech Park,<br />Bangalore, Karnataka 560001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                                <span>support@explorenow.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6">Newsletter</h3>
                        <p className="text-gray-500 text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} ExploreNow Inc. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} />
                        <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
                        <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} />
                        <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Helper component for social icons
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
        >
            {icon}
        </a>
    );
}