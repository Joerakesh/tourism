import Link from "next/link";
import Image from "next/image";
import { Star, Clock, ArrowRight } from "lucide-react";
import { Place } from "@/types";

export default function PlaceCard({ place }: { place: Place }) {
    // Logic: Use the first image if available, otherwise use a gray placeholder
    const validImage = place.images && place.images.length > 0
        ? place.images[0]
        : null;

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                {validImage ? (
                    <Image
                        src={validImage}
                        alt={place.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    // Fallback if no URL is provided
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No Image
                    </div>
                )}

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm z-10">
                    ₹{place.price.toLocaleString('en-IN')} / person
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-gray-900 line-clamp-1">{place.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{place.rating || 4.8}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                        <Clock className="w-4 h-4" />
                        {place.duration || "3 Days / 2 Nights"}
                    </div>

                    <Link
                        href={`/places/${place._id}`}
                        className="flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all"
                    >
                        Details <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}