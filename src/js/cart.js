import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = [];
  let htmlItems = [];
  let allHtmlItems = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    cartItems = getLocalStorage(key);
    htmlItems = cartItems.map((item) => cartItemTemplate(item));
    allHtmlItems.push(htmlItems);
  }
  document.querySelector(".product-list").innerHTML = allHtmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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
