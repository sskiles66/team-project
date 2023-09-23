import { getLocalStorage } from "./utils.mjs";

/*
TODO: Abraham Jimenez -  The Talus Tent title is different on the home page and the cart page
 */

function renderCartContents() {
  let cartItems = [];
  let htmlItems = [];
  let allHtmlItems = [];
  let newList = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    cartItems = getLocalStorage(key);

    for (let j = 0; j < cartItems.length; j++) {
      let items = cartItems[j];
      // console.log(items);
      newList.push(items);
    }
  }

  htmlItems = newList.map((item) => cartItemTemplate(item));
  allHtmlItems.push(htmlItems);

  const stringWithoutCommas = allHtmlItems.join("").replace(/,/g, "");
  let noCommasList = [];
  noCommasList.push(stringWithoutCommas);

  document.querySelector(".product-list").innerHTML = noCommasList.join("");
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
