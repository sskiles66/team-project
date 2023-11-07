import {getLocalStorage, setLocalStorage} from "./utils.mjs";
import {findProductById} from "./externalServices.mjs";
import {calculateDiscount, discountPercentage } from "./calculateDiscount.mjs";
import { cartCount } from "./stores.mjs";

let product = {};

let colorIndex = 0;

let images = [];

let currentIndex = 0;

let length = 0;




function prev() {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  document.querySelector("#item-img").src = images[currentIndex];
}

function next() {
  currentIndex += 1;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  document.querySelector("#item-img").src = images[currentIndex];
  
}

function productDetailsTemplate(product) {

  let colors = product.Colors.map((color, index) => {
    
    return `<li class="colors"> <p>${index}</p><p>${color.ColorName}</p><img src=${color.ColorPreviewImageSrc}><button class="select" id="${index}">Choose this color</button></li> `;
  })

  

  return `<h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <div id="flag-cont">
      <p id="discount-flag">${discountPercentage}% off</p>
    </div>
    <button class="prev">&#10094;</button>
    <img
      id="item-img"
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.Name}"
    />
    <button class="next">&#10095;</button>
    <s class="product-card__price">$${product.FinalPrice}</s>
    <p>$${calculateDiscount(product.FinalPrice)}</p>
    <ul id="productColors">
      ${colors}
    </ul>
    <p class="product__color">${product.Colors[colorIndex].ColorName}</p>
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

  images.push(product.Images.PrimaryLarge);

  const extraImages = product.Images.ExtraImages;

  length = extraImages.length;

  for (let i =0; i<length; i++){
    images.push(extraImages[i].Src);
  }

  console.log(product);

  console.log(images);

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
    product.colorIndex = colorIndex;
    list.push(product);
    setLocalStorage("so-cart", list);
    cartCount.set(list.length);

  } else {
    let list = [];
    product.colorIndex = colorIndex;
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


  // Event handler function
function handleButtonClick(e) {
  if (e.target.classList.contains("select")) {
    e.preventDefault();
    console.log(e.target.id);
    colorIndex = e.target.id;
  }
}

function handleButtonPrevClick(e) {
  if (e.target.classList.contains("prev")) {
    e.preventDefault();
    prev();
  }
}

function handleButtonNextClick(e) {
  if (e.target.classList.contains("next")) {
    e.preventDefault();
    next();
  }
}


document.addEventListener("click", handleButtonClick);

document.addEventListener("click", handleButtonPrevClick);

document.addEventListener("click", handleButtonNextClick);


