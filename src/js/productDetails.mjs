import { getLocalStorage, setLocalStorage } from "./utils.mjs";




/*
  <h3 id="productName"></h3>
  <h2 class="divider" id="productNameWithoutBrand"></h2>
  <img id="productImage" class="divider" src="" alt="" />
  <p class="product-card__price" id="productFinalPrice"></p>
  <p class="product__color" id="productColorName"></p>
  <p class="product__description" id="productDescriptionHtmlSimple"></p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="">Add to Cart</button>
  </div>
*/


import { findProductById } from "./productData.mjs";


let product = {};


function productDetailsTemplate(product) {
  return `<h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.Name}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;
}




export default async function productDetails(productId, selector) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);


  if (product == undefined){
    alert("Error: Product not found!");
  }else{
    // once we have the product details we can render out the HTML
    const el = document.querySelector(selector);
    el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));


    // This function will animate the cart when the user clicks on the Add to Cart button
    function animateCart() {
      document.querySelector(".cart").classList.add("cart-animate");
      setTimeout(() => {
        document.querySelector(".cart").classList.remove("cart-animate");
      }, 100);
    }


    // once the HTML is rendered we can add a listener to Add to Cart button and animate the cart
    document.getElementById("addToCart").addEventListener("click", (e) => {
      addToCartHandler(e);
      animateCart();
    });
  }
 
}


function addProductToCart(product) {
  if (localStorage.getItem("so-cart") !== null) {
    let list = getLocalStorage("so-cart");
    list.push(product);
    setLocalStorage("so-cart", list);
  } else {
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
 






