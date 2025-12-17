import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbconnect";
import PlaceModel from "@/models/Place";
import { MOCK_PLACES } from "@/data/mockPlaces";

export async function GET() {
  try {
    await dbConnect();

    // 1. CLEAR OLD DATA (Optional, but good for testing)
    // await PlaceModel.deleteMany({});

    // 2. TRANSFORM DATA
    // The DB requires 'image', but mock data has 'images'.
    // We map 'images[0]' to 'image' to satisfy the schema.
    const placesToInsert = MOCK_PLACES.map((place) => ({
      ...place,
      image: place.images[0], // <--- THE FIX
    }));

    // 3. INSERT
    await PlaceModel.insertMany(placesToInsert);

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      count: placesToInsert.length,
    });
  } catch (error: any) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
