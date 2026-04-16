import { carsProducts } from "./cars";
import { autoPartsProducts } from "./autoParts";
import { clothingProducts } from "./clothing";
import { buildingMaterialsProducts } from "./buildingMaterials";
import { accessoriesProducts } from "./accessories";
import { products } from "./products";
import { categories } from "./categories";

const allProducts = [
  ...carsProducts,
  ...autoPartsProducts,
  ...clothingProducts,
  ...buildingMaterialsProducts,
  ...accessoriesProducts,
  ...products,
];

export const getAllProducts = () => allProducts;

export { carsProducts, autoPartsProducts, clothingProducts, buildingMaterialsProducts, accessoriesProducts, products, categories };