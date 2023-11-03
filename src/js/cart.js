import {
  getLocalStorage,
  setLocalStorage,
  renderHeaderFooter,
} from "./utils.mjs";
import {calculateDiscount} from "./calculateDiscount.mjs";
import {cartCount} from "./stores.mjs";

/**
 * @type {Element}
 */
const totalSel = document.querySelector("#total");

/**
 * @type {Array}
 */
let products = [];

renderHeaderFooter();

/**
 * Renders the contents of the shopping cart.
 *
 * This function retrieves the cart items from local storage, updates the cart count,
 * and iterates over each item. If an item already exists in the products array,
 * its quantity is incremented. If it doesn't exist, it's added to the products array
 * with a quantity of 1.
 *
 * The function then generates HTML for each product and updates the innerHTML of
 * the ".product-list" element. If there are items in the cart, it removes the "hide"
 * class from the totalSel element.
 *
 * Finally, it calculates the total cost and updates the innerHTML of the "#total-amount" element.
 */
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  cartCount.set(cartItems.length);

  cartItems.forEach((item) => {
    let existingItem = products.find((product) => product.Id === item.Id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      item.quantity = 1;
      products.push(item);
    }
  });

  const htmlItems = products.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  if (cartItems.length !== 0) {
    totalSel.classList.remove("hide");
  }

  const total = getTotalCost();
  document.querySelector("#total-amount").innerHTML = "$" + total;
}

/**
 * Gets the total cost of items in cart
 *
 * @return {number}
 */
function getTotalCost() {
  let total = 0;
  const cartItems = getLocalStorage("so-cart");
  cartItems.forEach((element) => {
    /**
     * @param {Number} element.ListPrice
     */
    total += parseFloat(calculateDiscount(element.ListPrice));
  });

  return parseFloat(total.toFixed(2));
}

/**
 * Creates a cart item template.
 *
 * This function takes an item object as a parameter and returns a string of HTML.
 * The HTML string represents a list item element with various child elements
 * displaying the item's details, such as its image, name, color, price, and quantity.
 *
 * @param {Object} item - The item to create a template for.
 * @param {string} item.Id - The ID of the item.
 * @param {string} item.Name - The name of the item.
 * @param {string} item.Images.PrimaryLarge - The URL of the item's primary large image.
 * @param {Array} item.Colors - An array of the item's available colors.
 * @param {string} item.Colors.ColorName - The name of the color.
 * @param {number} item.FinalPrice - The final price of the item.
 * @param {number} item.quantity - The quantity of the item in the cart.
 *
 * @returns {string} - A string of HTML representing a cart item.
 */
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
<button class="remove" id="${item.Id}">X</button>
<button class="add" id="${item.Id}">+</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryLarge}"
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

/**
 * Handles the click event for removing an item from the cart.
 * @param {Object} e.target.classList
 *
 * @param {Event} e - The click event.
 */
function handleRemoveClick(e) {
  if (e.target.classList.contains("remove")) {
    e.preventDefault();
    let buttonId = e.target.getAttribute("id");
    let list = getLocalStorage("so-cart");
    let indexToRemove = list.findIndex((item) => item.Id === buttonId);
    if (indexToRemove !== -1) {
      list.splice(indexToRemove, 1);
      setLocalStorage("so-cart", list);
      cartCount.set(list.length);
      products = [];
      if (list.length === 0) {
        totalSel.classList.add("hide");
      }
      renderCartContents();
    }
  }
}

/**
 * Handles the click event for adding an item to the cart.
 * @param {Object} e.target.classList
 *
 * @param {Event} e - The click event.
 */
function handleAddClick(e) {
  if (e.target.classList.contains("add")) {
    e.preventDefault();
    let object = e.target.getAttribute("id");
    let list = getLocalStorage("so-cart");
    let indexToAdd = list.findIndex((item) => item.Id === object);
    let itemToAdd = list[indexToAdd];

    if (indexToAdd > -1) {
      let newList = list.concat(itemToAdd);
      setLocalStorage("so-cart", newList);
      products = [];
      renderCartContents();
    }
  }
}

/**
 * Handles the click event for the checkout button.
 */
function handleCheckoutClick() {
  location.href = "../checkout/index.html";
}

// Add event listeners
document.addEventListener("click", handleRemoveClick);
document.addEventListener("click", handleAddClick);
document
  .querySelector("#checkoutButton")
  .addEventListener("click", handleCheckoutClick);

renderCartContents();
