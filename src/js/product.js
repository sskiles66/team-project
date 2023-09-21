import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

const productList = []

function addProductToCart(product) {
  productList.push(product)
  setLocalStorage(product.NameWithoutBrand, productList);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
