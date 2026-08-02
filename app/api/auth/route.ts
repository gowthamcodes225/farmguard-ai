import { NextRequest, NextResponse } from "next/server";

const DEMO_USER = { email: "farmer@farmguard.ai", password: "demo123", name: "Demo Farmer" };

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    return NextResponse.json({ success: true, user: { name: DEMO_USER.name, email: DEMO_USER.email } });
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
