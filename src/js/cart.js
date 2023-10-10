import {getLocalStorage} from "./utils.mjs";
import {calculateDiscount} from "./calculateDiscount.mjs";

const totalSel = document.querySelector("#total");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems !== null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    totalSel.classList.remove("hide");
    const total = getTotalCost();
    document.querySelector("#total-amount").innerHTML = "$" + total;
  }
}

function getTotalCost() {
  let total = 0;
  const cartItems = getLocalStorage("so-cart");
  cartItems.forEach((element) => {
    /*
    I feel like this line of code that I modified can cause Issues. Currently, this is only adding items that are
    discounted. If an item has no discount, the item price will not be added to the total, I assume.
    Here is the old line of code in order to add items without a discount:
    total += element.ListPrice;
    Commit Hash: 0c83c499a3ae2aad2bdda36a8e20012a4380f612
    */
    total += parseFloat(calculateDiscount(element.ListPrice));
  });

  return total;
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
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
  <div>
    <s class="cart-card__price">$${item.FinalPrice}</s>
    <p>$${calculateDiscount(item.FinalPrice)}</p>
  </div>
</li>`;
}

renderCartContents();
