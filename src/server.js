import express from "express";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./api/products/index.js";
import {
  badRequestErrorHandler,
  genericErrorHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandler.js";

const server = express();
const port = 3001;

server.use(express.json());

server.use("/products", productsRouter);

server.use(notFoundErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(badRequestErrorHandler);
server.use(genericErrorHandler); //500
//genericErrorHandler needs to be the last in chain.

server.listen(port, () => {
  console.log(listEndpoints(server));
  console.log("server is running on port:", port);
});
