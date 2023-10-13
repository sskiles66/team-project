import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { calculateDiscount } from "./calculateDiscount.mjs";

const totalSel = document.querySelector("#total");

let products = [];

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems !== null) {
    // cartItems.forEach((item) => {
    //   if (!products.some(item)){
    //     products.push(item)
    //   }
    //   console.log(products);
    // })
    //products = cartItems;

    cartItems.forEach((item) => {
      let existingItem = products.find((product) => product.Id === item.Id);
      if (existingItem) {
        existingItem.quantity = cartItems.length;
      } else {
        item.quantity = 1;
        products.push(item);
      }
    });

    console.log(cartItems);
    console.log(products);

    const htmlItems = products.map((item) => cartItemTemplate(item));
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

function setListeners() {
  let index = 0;
  const cartItems = getLocalStorage("so-cart");
  cartItems.forEach((item) => {
    const deleteButton = document.getElementById(item.Id);
    console.log(item.Id);
    deleteButton.addEventListener("click", () => {
      const cartItem = item;
      removeItem(cartItem);
    });
    //   cartItems.forEach((item) => {
    //     const deleteButton = document.querySelector(`#${item.Id}`);
    //     deleteButton.addEventListener('click', () => {
    //       const cartItem = item;
    //       removeItem(cartItem);
    //     })
    //   })
  });
}

function removeItem(item) {
  const cartItems = getLocalStorage("so-cart");
  const deleteItem = cartItems.findIndex(function (object) {
    return object.Id === item.Id;
  });

  cartItems.splice(deleteItem, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartItemTemplate(item) {
  console.log(item.quantity);
  return `<li class="cart-card divider">
<snan id="${item.Id}">X</snan>
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
  <div>
    <s class="cart-card__price">$${item.FinalPrice}</s>
    <p>$${calculateDiscount(item.FinalPrice)}</p>
  </div>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

renderCartContents();
