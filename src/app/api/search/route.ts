import { NextResponse } from "next/server";
import { searchProducts } from "@/lib";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length === 0) {
    return NextResponse.json(
      { error: "يجب إدخال كلمة البحث" },
      { status: 400 }
    );
  }

  const results = searchProducts(q.trim());

  return NextResponse.json({
    data: results,
    total: results.length,
    query: q,
  });
}
