import { NextResponse } from "next/server";
import { categories } from "@/data/categories";

export async function GET() {
  try {
    return NextResponse.json({
      data: categories,
      total: categories.length,
    });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ في جلب الأقسام" },
      { status: 500 }
    );
  }
}
