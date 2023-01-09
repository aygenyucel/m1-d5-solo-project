import fs from "fs-extra";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const productsJSONPath = join(dataFolderPath, "products.json");

const publicImgProductsPath = join(process.cwd(), "/public/img/products");

export const getProducts = () => fs.readJSON(productsJSONPath);

export const writeProducts = (productsArray) =>
  fs.writeJSON(productsJSONPath, productsArray);

export const saveProductImg = (fileName, contentAsABuffer) =>
  fs.writeFile(join(publicImgProductsPath, fileName), contentAsABuffer);

export const deleteProductsPicture = (imageUrl) =>
  fs.unlink(join(publicImgProductsPath, "../../", imageUrl));
