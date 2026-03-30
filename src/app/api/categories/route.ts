import { NextResponse } from "next/server";
import { categories } from "@/lib";

export async function GET() {
  return NextResponse.json({
    data: categories,
    total: categories.length,
  });
}
