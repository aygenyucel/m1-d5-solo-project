import express from "express";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import uniqid from "uniqid";

const productsRouter = express.Router();

const productsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../data/products.json"
);

productsRouter.post("/", async (req, res, next) => {
  try {
    console.log("productsJSONPath:", productsJSONPath);
    const newProduct = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      _id: uniqid(),
    };
    const productsArray = await fs.readJSON(productsJSONPath);

    productsArray.push(newProduct);
    await fs.writeJSON(productsJSONPath, productsArray);
    res.status(201).send({ _id: newProduct._id });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res) => {
  const productsArray = await fs.readJSON(productsJSONPath);
  res.send(productsArray);
});

productsRouter.get("/:productId", async (req, res) => {
  const productsArray = await fs.readJSON(productsJSONPath);
  const product = productsArray.find(
    (product) => product._id === req.params.productId
  );

  res.send(product);
});

productsRouter.put("/:productId", async (req, res) => {
  const productsArray = await fs.readJSON(productsJSONPath);
  const productIndex = productsArray.findIndex(
    (product) => product._id === req.params.productId
  );
  const updatedProduct = {
    ...productsArray[productIndex],
    ...req.body,
    updatedAt: new Date(),
  };
  productsArray[productIndex] = updatedProduct;
  fs.writeJSON(productsJSONPath, productsArray);
  res.send(updatedProduct);
});

productsRouter.delete("/:productId", async (req, res) => {
  const productsArray = await fs.readJSON(productsJSONPath);
  const remainingArray = productsArray.filter(
    (product) => product._id !== req.params.productId
  );
  await fs.writeJSON(productsJSONPath, remainingArray);
  res.status(204).send();
});

export default productsRouter;
