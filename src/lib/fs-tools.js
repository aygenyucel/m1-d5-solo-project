import fs from "fs-extra";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const productsJSONPath = join(dataFolderPath, "products.json");

export const getProducts = () => fs.readJSON(productsJSONPath);

export const writeProducts = (productsArray) =>
  fs.writeJSON(productsJSONPath, productsArray);
