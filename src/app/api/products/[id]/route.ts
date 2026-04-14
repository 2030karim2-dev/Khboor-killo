import { NextResponse } from "next/server";
import { getProductById } from "@/utils/helpers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        { error: "المنتج غير موجود" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: product });
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ في جلب المنتج" },
      { status: 500 }
    );
  }
}
