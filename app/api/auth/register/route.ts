import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbconnect";
import User from "@/models/User";
import { hashPassword } from "@/utils/password";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await dbConnect();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "Email already used" }, { status: 400 });
  }

  const user = await User.create({
    name,
    email,
    password: await hashPassword(password),
    role: "user",
  });

  return NextResponse.json({ success: true, userId: user._id });
}
