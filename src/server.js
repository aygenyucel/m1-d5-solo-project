import express from "express";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./api/products/index.js";

const server = express();
const port = 3001;

server.use(express.json());

server.use("/products", productsRouter);

server.listen(port, () => {
  console.log(listEndpoints(server));
  console.log("server is running on port:", port);
});
