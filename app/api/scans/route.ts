import { NextResponse } from "next/server";
import { getScans } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getScans());
}
