import express from "express";
import listEndpoints from "express-list-endpoints";
import productRouter from "./api/product/index.js";
import productsRouter from "./api/products/index.js";
import {
  badRequestErrorHandler,
  genericErrorHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandler.js";
import { join } from "path";

const server = express();
const port = 3001;

const publicFolderPath = join(process.cwd(), "./public");

server.use(express.static(publicFolderPath));

server.use(express.json());

server.use("/products", productsRouter);
server.use("/product", productRouter);

server.use(notFoundErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(badRequestErrorHandler);
server.use(genericErrorHandler); //500
//genericErrorHandler needs to be the last in chain.

server.listen(port, () => {
  console.log(listEndpoints(server));
  console.log("server is running on port:", port);
});
