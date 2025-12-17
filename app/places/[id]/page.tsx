import dbConnect from "@/utils/dbconnect";
import PlaceModel from "@/models/Place";
import Link from "next/link";
import {
    ArrowLeft, Clock, MapPin, CheckCircle2, Star,
    Share2, Heart, Home, ChevronRight, Users, Calendar
} from "lucide-react";
import { notFound, redirect } from "next/navigation";
import MapWrapper from "@/components/MapWrapper";
import { Metadata } from "next";
import mongoose from "mongoose";

interface Props {
    params: Promise<{ id: string }>;
}

// 1. DYNAMIC METADATA (For SEO & Social Sharing)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    await dbConnect();

    // Safety check for ID format before querying
    if (!mongoose.Types.ObjectId.isValid(id)) return { title: "Place Not Found" };

    const place = await PlaceModel.findById(id).lean();
    if (!place) return { title: "Place Not Found" };

    return {
        title: `${place.name} | ExploreNow`,
        description: place.description?.substring(0, 160),
        openGraph: {
            images: place.images?.[0] ? [place.images[0]] : [],
        },
    };
}

export default async function PlaceDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // 2. VALIDATION REDIRECT: If ID looks fake, send them back to explore
    if (!mongoose.Types.ObjectId.isValid(id)) {
        redirect("/explore?error=invalid_id");
    }

    await dbConnect();

    let place = null;
    try {
        place = await PlaceModel.findById(id).lean();
    } catch (error) {
        // If DB fails, generic server error redirect
        redirect("/explore?error=server_error");
    }

    // 3. NOT FOUND REDIRECT: Valid ID, but no document found
    if (!place) {
        redirect("/explore?error=not_found");
    }

    // --- DATA PREPARATION ---

    // WhatsApp Message
    const message = `Hi! I found "${place.name}" on ExploreNow and I'm interested in the ₹${place.price} package.`;
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;

    // Amenities (Database or Fallback)
    const features = place.amenities?.length > 0
        ? place.amenities
        : ["Breakfast Included", "Expert Guide", "AC Transport", "Hotel Stay", "All Entry Fees"];

    // Images (Handle array logic)
    const mainImage = place.image || place.images?.[0];
    const secondaryImages = place.images?.slice(1, 3) || [];

    // Price Safe Fallback
    const displayPrice = (place.price || 0).toLocaleString('en-IN');

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">

            {/* 4. NAVIGATION BREADCRUMBS */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
                            <Home className="w-4 h-4" />
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                        <Link href="/explore" className="hover:text-blue-600 transition">Explore</Link>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                        <span className="font-medium text-gray-900 line-clamp-1 max-w-[150px] md:max-w-xs">
                            {place.name}
                        </span>
                    </div>
                    <Link
                        href="/explore"
                        className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* 5. TITLE & HEADER INFO */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                                {place.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-medium">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full">
                                    <MapPin className="w-4 h-4 text-blue-600" /> {place.location}
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full">
                                    <Clock className="w-4 h-4 text-blue-600" /> {place.duration || "3 Days / 2 Nights"}
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 text-orange-700 rounded-full">
                                    <Star className="w-4 h-4 fill-current text-orange-500" /> 4.8 (120 Reviews)
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm">
                                <Share2 className="w-5 h-5 text-gray-700" />
                            </button>
                            <button className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm group">
                                <Heart className="w-5 h-5 text-gray-700 group-hover:fill-red-500 group-hover:text-red-500 transition" />
                            </button>
                        </div>
                    </div>

                    {/* 6. BENTO GRID GALLERY */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-sm">
                        {/* Main Large Image */}
                        <div className={`relative ${secondaryImages.length > 0 ? 'md:col-span-3' : 'md:col-span-4'} h-full group bg-gray-200`}>
                            <img
                                src={mainImage}
                                alt={place.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>

                        {/* Side Images */}
                        {secondaryImages.length > 0 && (
                            <div className="hidden md:flex flex-col gap-4 h-full">
                                {secondaryImages.map((img: string, i: number) => (
                                    <div key={i} className="relative h-1/2 overflow-hidden rounded-2xl bg-gray-200">
                                        <img
                                            src={img}
                                            alt="Gallery"
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 7. SPLIT LAYOUT (Details Left, Booking Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN: Content */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Description */}
                        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Experience</h2>
                            <div className="prose text-gray-600 leading-loose text-lg font-light">
                                {place.description || "Experience the beauty of nature with this curated travel package. Perfect for families and couples looking to escape the city hustle."}
                            </div>
                        </section>

                        {/* Amenities */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {features.map((feature: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition group">
                                        <div className="bg-green-50 p-2.5 rounded-full group-hover:bg-green-100 transition">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="font-medium text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Map */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                            <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200 z-0 relative bg-gray-100">
                                <MapWrapper
                                    pos={[place.lat || 20.5937, place.lon || 78.9629]}
                                    name={place.name}
                                />
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Sticky Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-8">

                            {/* Price Header */}
                            <div className="flex justify-between items-end mb-8 pb-6 border-b border-gray-100">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Total Price</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-gray-900">₹{displayPrice}</span>
                                        <span className="text-gray-400 font-medium">/ person</span>
                                    </div>
                                </div>
                            </div>

                            {/* Fake Inputs for Interaction */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-2xl hover:border-blue-400 transition cursor-pointer group">
                                    <Calendar className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Date</p>
                                        <p className="text-sm font-semibold text-gray-900">Select Travel Dates</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-2xl hover:border-blue-400 transition cursor-pointer group">
                                    <Users className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Guests</p>
                                        <p className="text-sm font-semibold text-gray-900">2 Guests</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-full bg-[#25D366] hover:bg-[#1ebc51] text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1 flex items-center justify-center gap-3"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                    className="w-6 h-6 invert brightness-0 transition-transform group-hover:scale-110"
                                    alt="WhatsApp"
                                />
                                Request Booking
                            </a>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-gray-400 font-medium">
                                    Secure booking via WhatsApp • No instant payment
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}