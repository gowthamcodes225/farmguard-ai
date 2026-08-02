import { NextResponse } from "next/server";
import { getScans } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getScans());
}
