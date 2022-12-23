import express from "express";
import multer from "multer";
import { join } from "path";
import {
  saveProductImg,
  getProducts,
  writeProducts,
} from "./../../lib/fs-tools.js";

const productRouter = express.Router();

productRouter.post(
  "/:id/upload/single",
  multer().single("image"),
  async (req, res, next) => {
    try {
      await saveProductImg(req.file.originalname, req.file.buffer);

      const url = `http://localhost:3001/img/products/${req.file.originalname}`;
      const productsArray = await getProducts();
      const index = productsArray.findIndex(
        (product) => product._id === req.params.id
      );
      if (index !== -1) {
        const oldProduct = productsArray[index];

        const updatedProduct = {
          ...oldProduct,
          imageUrl: url,
          updatedAt: new Date(),
        };
        productsArray[index] = updatedProduct;
        await writeProducts(productsArray);
      }
      res.send("File uploaded");
    } catch (error) {
      next(error);
    }
  }
);

productRouter.post(
  "/:id/upload/multiple",
  multer().array("images"),
  async (req, res, next) => {
    try {
      await Promise.all(
        req.files.map((file) => saveProductImg(file.originalname, file.buffer))
      );
      res.send("file uploaded");
    } catch (error) {
      next(error);
    }
  }
);
export default productRouter;
