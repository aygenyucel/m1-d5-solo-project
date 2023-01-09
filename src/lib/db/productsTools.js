import { deleteProductsPicture, getProducts, writeProducts } from "../fs/tools";
import { uniqid } from "uniqid";

export const saveNewProduct = async (newProductData) => {
  const products = await getProducts();
  const newProduct = {
    ...newProductData,
    createdAt: new Date(),
    _id: uniqid(),
    reviews: [],
  };
  products.push(newProduct);
  await writeProducts(products);
  return newProduct._id;
};

export const findProducts = async () => getProducts();

export const findProductById = async (productId) => {
  const productsArray = await getProducts();
  const product = productsArray.find((product) => product._id === productId);
  return product;
};

export const findProductByIdAndUpdate = async (productId, updates) => {
  const productsArray = await getProducts();
  const index = productsArray.findIndex((product) => product._id === productId);

  if (index !== -1) {
    productsArray[index] = {
      ...productsArray[index],
      ...updates,
      updatedAt: new Date(),
    };
    await writeProducts(products);
    return productsArray[index];
  } else {
    return null;
  }
};

export const findProductByIdAndDelete = async (productId) => {
  const productsArray = await getProducts();
  const product = await findProductById(productId);
  if (product) {
    await deleteProductsPicture(product.imageUrl);
    const remainingProducts = productsArray.filter(
      (product) => product._id !== productId
    );
    await writeProducts(remainingProducts);
    return product;
  } else {
    return null;
  }
};
