// This gets card data (string)
const cartData = localStorage.getItem("so-cart");
// This converts the string to an object
const cartItems = JSON.parse(cartData);
// This gets the cart icon
const cartIcon = document.querySelector(".cart");

function createSuperscript() {
  cartIcon.insertAdjacentHTML("beforeend", `<sup class="cart__superscript">${cartItems.length}</sup>`);
  // Reference the superscript
  const superscript = document.querySelector(".cart__superscript");
  // Style the superscript
  superscript.style.position = "absolute";
  superscript.style.top = "4px"
  superscript.style.right = "-8px"
  superscript.style.backgroundColor = "red";
  superscript.style.borderRadius = "50%";
  superscript.style.padding = "2px";
}

function styleCart() {
  cartIcon.style.position = "relative";
}

export default function displaySuperscript() {
  createSuperscript();
  styleCart();
}
