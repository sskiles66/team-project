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
  superscript.style.top = "4px";
  superscript.style.right = "-8px";
  superscript.style.backgroundColor = "red";
  superscript.style.borderRadius = "50%";
  superscript.style.padding = "1.3px";
  if (cartItems.length < 9) {
    superscript.style.padding = "0";
    superscript.style.width = "16px";
    superscript.style.height = "16px";
  }
}

function styleCart() {
  cartIcon.style.position = "relative";
}

function updateOnClick() {
  // This code runs when localStorage is updated
  window.addEventListener("storage", (e) => {
    console.log(e.key);
    console.log("storage event fired");
  });
}

export default function displaySuperscript() {
  createSuperscript();
  styleCart();
  // updateOnClick();
}
