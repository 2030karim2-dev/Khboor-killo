import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 2 | 3 | 4;
}) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {products.map((product, i) => (
        <div key={product.id} style={{ animationDelay: `${i * 50}ms` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
