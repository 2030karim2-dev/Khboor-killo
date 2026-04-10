import { Product } from "../types/product";
import { carsProducts } from "./cars";
import { autoPartsProducts } from "./autoParts";
import { clothingProducts } from "./clothing";
import { buildingMaterialsProducts } from "./buildingMaterials";
import { accessoriesProducts } from "./accessories";

export const products: Product[] = [
  ...carsProducts,
  ...autoPartsProducts,
  ...clothingProducts,
  ...buildingMaterialsProducts,
  ...accessoriesProducts,
];
