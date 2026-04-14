import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { getFeaturedProducts, getProductsByCategory } from "@/utils/helpers";

const MAX_LIMIT = 100;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");

    let result = products;

    if (featured === "true") {
      result = getFeaturedProducts();
    } else if (category) {
      result = getProductsByCategory(category);
    }

    const total = result.length;
    const pageSize = limit ? Math.min(Math.max(parseInt(limit, 10) || 20, 1), MAX_LIMIT) : 20;
    const currentPage = page ? Math.max(parseInt(page, 10) || 1, 1) : 1;
    const totalPages = Math.ceil(total / pageSize);
    const offset = (currentPage - 1) * pageSize;

    result = result.slice(offset, offset + pageSize);

    return NextResponse.json({
      data: result,
      meta: {
        total,
        page: currentPage,
        pageSize,
        totalPages,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ في جلب المنتجات" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.description || !body.price || !body.categorySlug) {
      return NextResponse.json(
        { error: "البيانات المطلوبة: name, description, price, categorySlug" },
        { status: 400 }
      );
    }

    const newProduct = {
      id: `${body.categorySlug}-${Date.now()}`,
      name: body.name,
      description: body.description,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      image: body.image || "",
      images: body.images || [],
      category: body.category || "",
      categorySlug: body.categorySlug,
      rating: 0,
      reviews: 0,
      inStock: body.inStock !== false,
      featured: false,
    };

    return NextResponse.json({ data: newProduct }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ في إنشاء المنتج" },
      { status: 500 }
    );
  }
}
