"use client";

import dynamic from "next/dynamic";

// 1. Move the dynamic import here
const LeafletMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    // Optional: Add a loading skeleton while the map loads
    loading: () => (
        <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">
            Loading Map...
        </div>
    )
});

interface MapProps {
    pos: [number, number];
    name: string;
}

export default function MapWrapper({ pos, name }: MapProps) {
    return <LeafletMap pos={pos} name={name} />;
}