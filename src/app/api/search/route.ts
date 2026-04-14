import { NextResponse } from "next/server";
import { searchProducts } from "@/utils/helpers";

const MAX_QUERY_LENGTH = 200;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || q.trim().length === 0) {
      return NextResponse.json(
        { error: "يجب إدخال كلمة البحث" },
        { status: 400 }
      );
    }

    const query = q.trim().slice(0, MAX_QUERY_LENGTH);
    const results = searchProducts(query);

    return NextResponse.json({
      data: results,
      total: results.length,
      query,
    });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ في البحث" },
      { status: 500 }
    );
  }
}
