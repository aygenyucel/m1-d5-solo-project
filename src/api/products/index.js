import express from "express";
import uniqid from "uniqid";
import { getProducts, writeProducts } from "../../lib/fs-tools.js";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      _id: uniqid(),
    };
    const productsArray = await getProducts();

    productsArray.push(newProduct);
    await writeProducts(productsArray);
    res.status(201).send({ _id: newProduct._id });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res) => {
  const productsArray = await getProducts();
  res.send(productsArray);
});

productsRouter.get("/:productId", async (req, res) => {
  const productsArray = await getProducts();
  const product = productsArray.find(
    (product) => product._id === req.params.productId
  );

  res.send(product);
});

productsRouter.put("/:productId", async (req, res) => {
  const productsArray = await getProducts();
  const productIndex = productsArray.findIndex(
    (product) => product._id === req.params.productId
  );
  const updatedProduct = {
    ...productsArray[productIndex],
    ...req.body,
    updatedAt: new Date(),
  };
  productsArray[productIndex] = updatedProduct;
  await writeProducts(productsArray);
  res.send(updatedProduct);
});

productsRouter.delete("/:productId", async (req, res) => {
  const productsArray = await getProducts();
  const remainingArray = productsArray.filter(
    (product) => product._id !== req.params.productId
  );
  await writeProducts(remainingArray);
  res.status(204).send();
});

export default productsRouter;
