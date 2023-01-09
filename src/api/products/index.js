import express from "express";
import uniqid from "uniqid";
import httpErrors from "http-errors";
import {
  getProducts,
  saveProductImg,
  writeProducts,
} from "./../../lib/fs/tools";
import {
  saveNewProduct,
  findProducts,
  findProductById,
  findProductByIdAndUpdate,
  findProductByIdAndDelete,
} from "../../lib/db/productsTools";
import multer from "multer";

import { extname } from "path";
import { saveNewReview } from "../../lib/db/reviewsTools";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    // throw new Error("KABOOOOOOOOOOO");
    // const newProduct = {
    //   ...req.body,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   _id: uniqid(),
    // };
    // const productsArray = await getProducts();

    // productsArray.push(newProduct);
    // await writeProducts(productsArray);

    const id = await saveNewProduct(req.body);
    res.status(201).send({ _id: newProduct._id });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    // const productsArray = await getProducts();
    const productsArray = await findProducts();
    res.send(productsArray);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    // const productsArray = await getProducts();
    // const product = productsArray.find(
    //   (product) => product._id === req.params.productId
    // );

    const product = await findProductById(req.params.productId);

    if (product) {
      res.send(product);
    } else {
      next(
        httpErrors.NotFound(
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    // const productsArray = await getProducts();
    // const productIndex = productsArray.findIndex(
    //   (product) => product._id === req.params.productId
    // );
    // const updatedProduct = {
    //   ...productsArray[productIndex],
    //   ...req.body,
    //   updatedAt: new Date(),
    // };
    // productsArray[productIndex] = updatedProduct;
    // await writeProducts(productsArray);
    // res.send(updatedProduct);
    const updatedProduct = await findProductByIdAndUpdate(
      req.params.productId,
      req.body
    );
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      next(
        httpErrors.NotFound(
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    // const productsArray = await getProducts();
    // const remainingArray = productsArray.filter(
    //   (product) => product._id !== req.params.productId
    // );
    // if (productsArray.length !== remainingArray.length) {
    //   await writeProducts(remainingArray);
    //   res.status(204).send();
    // } else {
    //   next(
    //     httpErrors.NotFound(
    //       `Product with id ${req.params.productId} not found!`
    //     )
    //   );
    // }
    const product = await findProductByIdAndDelete(req.params.productId);
    if (product) {
      res.status(204).send();
    } else {
      next(
        httpErrors.NotFound(
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.patch(
  "/:productId/image",
  multer().single("image"),
  async (req, res, next) => {
    try {
      //1. create a unique name fot that image (something like productId.png)
      const filename = req.params.productId + extname(req.file.originalname);
      //2. Update the product record with the image url
      const product = await findProductByIdAndUpdate(req.params.productId, {
        imageUrl: `/img/products/${filename}`,
      });

      //3. save the file into the public folder
      if (product) {
        await saveProductImg(req.file.buffer, filename);
        res.send(product);
      } else {
        next(
          httpErrors.NotFound(
            `Product with id ${req.params.productId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    const product = await saveNewReview(req.params.productId, req.body);
    if (product) {
      res.send(product);
    } else {
    }
    next(
      httpErrors.NotFound(`Product with id ${req.params.productId} not found!`)
    );
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:productId/reviews/reviewId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
productsRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
productsRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
