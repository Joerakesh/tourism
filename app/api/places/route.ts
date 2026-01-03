import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbconnect";
import Place from "@/models/Place";

export async function GET() {
  try {
    await dbConnect();
    const places = await Place.find({}); // Get everything
    return NextResponse.json({ success: true, data: places });
  } catch (error) {
    return NextResponse.json({ success: false, data: [] });
  }
}
