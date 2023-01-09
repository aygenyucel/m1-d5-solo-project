import { getProducts, writeProducts } from "../fs/tools";
import { uniqid } from "uniqid";

export const saveNewReview = async (productId, newReviewData) => {
  const productsArray = await getProducts();
  const index = productsArray.findIndex((product) => product._id === productId);

  if (index !== -1) {
    productsArray[index].reviews.push({
      ...newReviewData,
      id: uniqid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await writeProducts(productsArray);
    return productsArray[index];
  } else {
    return null;
  }
};

export const findReviews = async () => {};
export const findReviewById = async () => {};
export const findReviewByIdAndUpdate = async () => {};
export const findReviewByIdAndDelete = async () => {};
