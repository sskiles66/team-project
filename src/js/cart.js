import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { calculateDiscount } from "./calculateDiscount.mjs";
import { renderHeaderFooter } from "./utils.mjs";
import { cartCount } from "./stores.mjs";

const totalSel = document.querySelector("#total");

let products = [];

renderHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  cartCount.set(cartItems.length);
  if (cartItems !== null) {
    // cartItems.forEach((item) => {
    //   if (!products.some(item)){
    //     products.push(item)
    //   }
    //   console.log(products);
    // })
    //products = cartItems;






    cartItems.forEach((item) => {
      if (item.quantity == 0){
        console.log("gogone");
      }
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

    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    totalSel.classList.remove("hide");
    const total = getTotalCost();
    document.querySelector("#total-amount").innerHTML = "$" + total;
    //setListeners();
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
  let index = -1;
  const cartItems = getLocalStorage("so-cart");
  cartItems.forEach((item) => {
    index += 1
    item.index = index
    //console.log(item.index)
    const deleteButton = document.getElementById(item.Id);
    console.log(item.Id);
    deleteButton.addEventListener("click", () => {
      console.log(item.index);
      //const cartItem = item;
      //removeItem(cartItem);
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
  // const deleteItem = cartItems.findIndex(function (object) {
  //   return object.Id === item.Id;
  // });

  const idToRemove = item.Id;

  console.log(idToRemove);

  const index = cartItems.findIndex(item => item.Id === idToRemove);

  
  console.log(index);

  if (index > -1) {
    cartItems.splice(index, 1);
}

  //cartItems.splice(deleteItem, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartItemTemplate(item) {
  console.log(item.quantity);
  return `<li class="cart-card divider">
<button class="remove" id="${item.Id}">X</button>
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

document.addEventListener("DOMContentLoaded", () => {
  let removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(`Removing item at index ${index}`);
      // Your code here
      remoove(index);
    });
  });
});

function remoove(index){
  const cartItems = getLocalStorage("so-cart");
  if (index > -1) {
    cartItems.splice(index, 1);
  }
  setLocalStorage("so-cart", cartItems);

  // Call renderCartContents() after removing an item from the cart
  renderCartContents();

  // Re-select all buttons with class 'remove'
  let removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(`Removing item at index ${index}`);
      // Your code here
      remoove(index);
    });
  });
}




renderCartContents();
