import { NextResponse } from "next/server";
import { products, getFeaturedProducts, getProductsByCategory } from "@/lib";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const limit = searchParams.get("limit");

  let result = products;

  if (featured === "true") {
    result = getFeaturedProducts();
  } else if (category) {
    result = getProductsByCategory(category);
  }

  if (limit) {
    const n = parseInt(limit, 10);
    if (!isNaN(n) && n > 0) {
      result = result.slice(0, n);
    }
  }

  return NextResponse.json({
    data: result,
    total: result.length,
  });
}
