// This gets card data (string)
const cartData = localStorage.getItem("so-cart");
// This converts the string to an object
const cartItems = JSON.parse(cartData);
// This gets the cart icon
const cartIcon = document.querySelector(".cart");

function createSuperscript() {
  if (cartItems === null) {
    cartIcon.insertAdjacentHTML("beforeend", `<sup class="cart__superscript">${0}</sup>`);
  } else {
    cartIcon.insertAdjacentHTML("beforeend", `<sup class="cart__superscript">${cartItems.length}</sup>`);
  }
  // Creates a superscript when there are no items in cart
  // Reference the superscript
  const superscript = document.querySelector(".cart__superscript");
  // Style the superscript
  superscript.style.position = "absolute";
  superscript.style.top = "4px";
  superscript.style.right = "-8px";
  superscript.style.backgroundColor = "#EB7E75";
  superscript.style.borderRadius = "50%";
  superscript.style.width = "18px";
  superscript.style.height = "18px";
}

function styleCart() {
  cartIcon.style.position = "relative";
}

function updateCartSuperscript() {
// Check for button click
// This checks if the DOM is loaded and will run code after it is loaded
  const observer = new MutationObserver(() => {
    // This will check if the button exists
    if (document.querySelector("#addToCart")) {
      const addToCartBtn = document.querySelector("#addToCart");

      // Check if the event listener is already added to avoid duplicate executions
      if (!addToCartBtn._clickListenerAdded) {
        addToCartBtn.addEventListener("click", () => {
          // Retrieve the current value .cart__superscript and turn string into int
          const cartSuperscript = document.querySelector(".cart__superscript");
          /* Why the 10? It's good practice and to make sure that the string is always interpreted as a decimal number
          even if it will have no decimals. Just in case we get HEX or octal */
          let currentValue = parseInt(cartSuperscript.textContent, 10);

          // Increment the value
          currentValue++;

          // Update the cart superscript with new value
          cartSuperscript.textContent = currentValue.toString();
        });
        // Set flag to check if the click event listener has been added
        addToCartBtn._clickListenerAdded = true;
      }
      // observer.disconnect(); // Normally, we would disconnect, but we want this code block to keep running
    }
  });

  observer.observe(document.documentElement, {childList: true, subtree: true});
}

function displaySuperscript() {
  createSuperscript();
  styleCart();
  updateCartSuperscript();
}

// Runs code in file
displaySuperscript()
