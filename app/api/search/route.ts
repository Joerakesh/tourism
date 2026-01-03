import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ error: "Query too short" }, { status: 400 });
  }

  try {
    // We use OpenStreetMap (Nominatim) for free geocoding
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        q
      )}+india&format=json&limit=5&addressdetails=1`,
      {
        headers: {
          "User-Agent": "ExploreNowApp/1.0", // Required by OSM
        },
      }
    );

    if (!res.ok) throw new Error("OSM API Failed");
    const data = await res.json();

    const results = data.map((p: any) => ({
      place_id: p.place_id,
      display_name: p.display_name,
      lat: p.lat,
      lon: p.lon,
    }));

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
