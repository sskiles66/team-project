import { getLocalStorage,setLocalStorage } from "./utils.mjs";
import {findProductById} from "./productData.mjs";

const totalSel = document.querySelector("#total");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems !== null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    totalSel.classList.remove("hide");
    const total = getTotalCost();
    document.querySelector("#total-amount").innerHTML = "$" + total;
    setListeners();
  }
}

function getTotalCost() {
  let total = 0;
  const cartItems = getLocalStorage("so-cart");
  cartItems.forEach((element) => {
    total += element.ListPrice;
  });

  return total;
}

function setListeners(){
  let index = 0
  const cartItems = getLocalStorage("so-cart");
  cartItems.forEach((item) => {
    const deleteButton = document.getElementById(item.Id);
    deleteButton.addEventListener('click', () => {
      const cartItem = item;
      removeItem(cartItem);
      })
//   cartItems.forEach((item) => {
//     const deleteButton = document.querySelector(`#${item.Id}`);
//     deleteButton.addEventListener('click', () => {
//       const cartItem = item;
//       removeItem(cartItem);
//     })
//   })
  })
}

function removeItem(item){
  const cartItems = getLocalStorage("so-cart");
  const deleteItem = cartItems.findIndex(function(object){
    return object.Id === item.Id;
  });

  cartItems.splice(deleteItem, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span id="${item.Id}" class="delete-button">❌</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();