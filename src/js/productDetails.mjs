import {getLocalStorage, setLocalStorage} from "./utils.mjs";
import {findProductById} from "./productData.mjs";
import {calculateDiscount} from "./calculateDiscount.mjs";
import { cartCount } from "./stores.mjs";

let product = {};

function productDetailsTemplate(product) {
  return `<h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.Name}"
    />
    <s class="product-card__price">$${product.FinalPrice}</s>
    <p>$${calculateDiscount(product.FinalPrice)}</p>
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

  if (product === undefined) {
    alert("Error: Product not found!");
  } else {
    // once we have the product details we can render out the HTML
    const el = document.querySelector(selector);
    el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));

    // This function will animate the cart when the user clicks on the Add to Cart button
    function animateCart() {
      document.querySelector(".cart").classList.add("cart-animate");
      setTimeout(() => {
        document.querySelector(".cart").classList.remove("cart-animate");
      }, 180);
    }

    // once the HTML is rendered we can add a listener to Add to Cart button and animate the cart
    document.getElementById("addToCart").addEventListener("mousedown", (e) => {
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
    cartCount.set(list.length);

  } else {
    let list = [];
    list.push(product);
    setLocalStorage("so-cart", list);
    cartCount.set(list.length);
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}
