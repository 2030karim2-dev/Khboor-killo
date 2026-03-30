import { Product } from "./types";
import { carsProducts } from "./data/cars";
import { autoPartsProducts } from "./data/autoParts";
import { clothingProducts } from "./data/clothing";
import { buildingMaterialsProducts } from "./data/buildingMaterials";
import { accessoriesProducts } from "./data/accessories";

export const products: Product[] = [
  ...carsProducts,
  ...autoPartsProducts,
  ...clothingProducts,
  ...buildingMaterialsProducts,
  ...accessoriesProducts,
];
