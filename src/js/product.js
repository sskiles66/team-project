import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";



function addProductToCart(product) {

  if (localStorage.getItem("so-cart") !== null) {
     let list = getLocalStorage("so-cart");
     list.push(product);
     setLocalStorage("so-cart", list);
    
  }else{
    let list = [];
    list.push(product);
    setLocalStorage("so-cart", list);
  }
  
  
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
