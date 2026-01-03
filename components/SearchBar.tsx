"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown if clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounced Search Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length > 2) {
                setLoading(true);
                try {
                    const res = await fetch(`/api/search?q=${query}`);
                    const data = await res.json();
                    setResults(data);
                    setIsOpen(true);
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);

    // Handle clicking a suggestion
    const handleSelect = (place: SearchResult) => {
        setQuery(place.display_name.split(",")[0]); // Show mostly city name
        setIsOpen(false);
        router.push(`/explore?search=${encodeURIComponent(place.display_name)}`);
    };

    // Handle hitting Enter or clicking Search Button
    const handleManualSearch = () => {
        if (query) {
            setIsOpen(false);
            router.push(`/explore?search=${encodeURIComponent(query)}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleManualSearch();
        }
    }

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
            {/* The Search Container */}
            <div className="bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center border border-gray-100 relative z-50">

                {/* INPUT: LOCATION (Now full width) */}
                <div className="flex-1 px-6 relative">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        Location
                    </label>
                    <input
                        type="text"
                        className="w-full text-gray-900 font-semibold placeholder-gray-400 focus:outline-none bg-transparent truncate text-lg"
                        placeholder="Where do you want to go?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => {
                            if (results.length > 0) setIsOpen(true);
                        }}
                    />
                    {loading && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                        </div>
                    )}
                </div>

                {/* SEARCH BUTTON */}
                <button
                    onClick={handleManualSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 m-1 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 shrink-0"
                >
                    <Search className="w-6 h-6" />
                </button>
            </div>

            {/* DROPDOWN RESULTS */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full mt-3 left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                        <div className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 bg-gray-50/50">
                            Suggested Destinations
                        </div>
                        {results.map((place) => (
                            <button
                                key={place.place_id}
                                onClick={() => handleSelect(place)}
                                className="w-full text-left px-5 py-4 hover:bg-blue-50 flex items-start gap-4 transition group border-b border-gray-50 last:border-0"
                            >
                                <div className="bg-gray-100 group-hover:bg-blue-200 group-hover:text-blue-700 p-2.5 rounded-full transition text-gray-500">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="block text-base font-bold text-gray-800 line-clamp-1 group-hover:text-blue-700 transition">
                                        {place.display_name.split(",")[0]}
                                    </span>
                                    <span className="block text-sm text-gray-500 line-clamp-1 opacity-70 mt-0.5">
                                        {place.display_name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}