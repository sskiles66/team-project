import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
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
      if (item.quantity == 0) {
        console.log("gogone");
      }
      let existingItem = products.find((product) => product.Id === item.Id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        item.quantity = 1;
        products.push(item);
      }
    });

    console.log(cartItems);
    console.log(products);

    const htmlItems = products.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    if (cartItems.length != 0) {
      totalSel.classList.remove("hide");
    }

    //totalSel.classList.remove("hide");

    const total = getTotalCost();
    document.querySelector("#total-amount").innerHTML = "$" + total;
    //setListeners();
  }
}

function getTotalCost() {
  let total = 0;
  const cartItems = getLocalStorage("so-cart");
  cartItems.forEach((element) => {
    total += parseFloat(calculateDiscount(element.ListPrice));
  });

  return total;
}

// Brock's Work
// function setListeners() {
//   let index = -1;
//   const cartItems = getLocalStorage("so-cart");
//   cartItems.forEach((item) => {
//     index += 1;
//     item.index = index;
//     //console.log(item.index)
//     const deleteButton = document.getElementById(item.Id);
//     console.log(item.Id);
//     deleteButton.addEventListener("click", () => {
//       console.log(item.index);
//       //const cartItem = item;
//       //removeItem(cartItem);
//     });
//     //   cartItems.forEach((item) => {
//     //     const deleteButton = document.querySelector(`#${item.Id}`);
//     //     deleteButton.addEventListener('click', () => {
//     //       const cartItem = item;
//     //       removeItem(cartItem);
//     //     })
//     //   })
//   });
// }
//Brock's Work
// function removeItem(item) {
//   const cartItems = getLocalStorage("so-cart");
//   // const deleteItem = cartItems.findIndex(function (object) {
//   //   return object.Id === item.Id;
//   // });

//   const idToRemove = item.Id;

//   console.log(idToRemove);

//   const index = cartItems.findIndex((item) => item.Id === idToRemove);

//   console.log(index);

//   if (index > -1) {
//     cartItems.splice(index, 1);
//   }

//   //cartItems.splice(deleteItem, 1);
//   setLocalStorage("so-cart", cartItems);
//   renderCartContents();
// }

function cartItemTemplate(item) {
  console.log(item.quantity);
  return `<li class="cart-card divider">
<button class="remove" id="${item.Id}">X</button>
<button class="add" id="${item.Id}">+</button>
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

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.preventDefault();
    let buttonId = e.target.getAttribute("id");
    console.log(`Removing item with id ${buttonId}`);

    let list = getLocalStorage("so-cart");
    let indexToRemove = list.findIndex((item) => item.Id === buttonId);
    if (indexToRemove !== -1) {
      list.splice(indexToRemove, 1);
      setLocalStorage("so-cart", list);
      cartCount.set(list.length);
      products = [];
      if (list.length == 0) {
        totalSel.classList.add("hide");
      }
      renderCartContents();
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add")) {
    e.preventDefault();
    let object = e.target.getAttribute("id");
    console.log(`Removing item with id ${object}`);

    let list = getLocalStorage("so-cart");

    let indexToAdd = list.findIndex((item) => item.Id === object);

    let itemToAdd = list[indexToAdd];

    if (indexToAdd > -1) {
      console.log(itemToAdd);
      let newList = list.concat(itemToAdd);
      setLocalStorage("so-cart", newList);
      products = [];
      renderCartContents();
    }
  }
});

document.querySelector("#checkoutButton").addEventListener("click", () => {
  location.href = "../checkout/index.html";
});

renderCartContents();
