"use client";

import { useState, useEffect, Suspense } from "react";
import { MOCK_PLACES, Place } from "@/data/mockPlaces";
import Link from "next/link";
import { Filter, Search, MapPin, Star, X, AlertCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

// We create a child component for the Logic to wrap it in Suspense
function ExploreContent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [priceRange, setPriceRange] = useState<number>(50000);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const router = useRouter();

    // 1. DETECT ERROR PARAM
    useEffect(() => {
        const error = searchParams.get("error");
        if (error === "not_found") {
            setErrorMsg("The package you are looking for is no longer available. Here are some other options!");
        } else if (error === "invalid_id") {
            setErrorMsg("That link looks invalid. We've redirected you to our full catalog.");
        }
    }, [searchParams]);

    // 2. DISMISS ERROR
    const dismissError = () => {
        setErrorMsg(null);
        // Clean the URL without reloading
        router.replace("/explore", { scroll: false });
    };

    const filteredPlaces = MOCK_PLACES.filter((place) => {
        const matchesSearch =
            place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            place.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || place.category === selectedCategory;
        const matchesPrice = place.price <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    const categories = ["All", "Mountain", "Beach", "Heritage", "City", "Forest"];

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* 3. ERROR BANNER */}
            {errorMsg && (
                <div className="mb-8 bg-red-50 border border-red-100 text-red-800 px-4 py-4 rounded-xl flex items-start justify-between animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                        <div>
                            <p className="font-semibold text-sm">Oops! Destination not found</p>
                            <p className="text-sm opacity-90">{errorMsg}</p>
                        </div>
                    </div>
                    <button onClick={dismissError} className="p-1 hover:bg-red-100 rounded-full transition">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Explore Packages</h1>
                <p className="text-gray-500 mt-2">Find the perfect destination for your next trip.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT SIDEBAR: FILTERS */}
                <aside className="w-full lg:w-1/4 h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                    <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg border-b pb-4 border-gray-100">
                        <Filter className="w-5 h-5" /> Filters
                    </div>

                    {/* Search Input */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 block mb-2">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Goa, Munnar..."
                                className="w-full pl-10 pr-4 py-2 text-black bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 block mb-2">Category</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition ${selectedCategory === cat
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-gray-700">Max Price</span>
                            <span className="text-blue-600 font-bold">₹{priceRange.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="50000"
                            step="1000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>₹1k</span>
                            <span>₹50k</span>
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("All");
                            setPriceRange(50000);
                        }}
                        className="w-full py-2 text-sm text-gray-500 hover:text-red-500 transition flex items-center justify-center gap-1"
                    >
                        <X className="w-4 h-4" /> Clear Filters
                    </button>
                </aside>

                {/* RIGHT SIDE: RESULTS GRID */}
                <div className="w-full lg:w-3/4">

                    <div className="mb-4 text-sm text-gray-500">
                        Showing <span className="font-bold text-gray-900">{filteredPlaces.length}</span> results
                    </div>

                    {filteredPlaces.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No places found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search term.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredPlaces.map((place) => (
                                <PlaceCard key={place._id} place={place} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// 4. MAIN PAGE EXPORT (Wrapper)
export default function ExplorePage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-10">
            <Suspense fallback={<div>Loading...</div>}>
                <ExploreContent />
            </Suspense>
        </div>
    );
}

function PlaceCard({ place }: { place: Place }) {
    return (
        <Link href={`/places/${place._id}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={place.images[0]}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-orange-400 fill-current" />
                    {place.rating}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">{place.name}</h3>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4" /> {place.location}
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                        <span className="block">Starting from</span>
                        <span className="text-lg font-bold text-blue-600">₹{place.price.toLocaleString()}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                        View Details
                    </span>
                </div>
            </div>
        </Link>
    );
}