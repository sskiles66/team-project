// This will grab the origin of the page link. This will allow for the breadcrumb links to work on the server as well
const origin = window.location.origin;

class Breadcrumb {
  constructor() {
    // Create empty array. This will store an array of objects. Each containing label and url
    this.items = [];
  }

  // Method to add label and url to array
  addItem(label, url) {
    console.log(this.items);
    this.items.push({label, url});
  }

  // Method to find breadcrumb id on DOM & display it
  render() {
    const breadcrumbContainer = document.querySelector("#breadcrumb");
    // Create links that will be displayed in the DOM
    breadcrumbContainer.innerHTML = this.items.map(item =>
      `
      <a href="${item.url}">${item.label}</a>
      `
    ).join(" &rarr; "); // This code is a -> symbol
  }
}

const breadcrumb = new Breadcrumb();

if (window.location.href.includes("index.html")) {
  // Adds 'Home' to breadcrumb | Home
  breadcrumb.addItem("Home", `${origin}/index.html`);
}

if (window.location.href.includes("product_pages/index.html")) {
  // Adds 'Product' to breadcrumb | Home -> Product
  breadcrumb.addItem("Product", `${origin}/product_pages/index.html?product=880RR`);
}

if (window.location.href.includes("cart/index.html")) {
  // Adds 'Cart' to breadcrumb | Home -> Cart
  breadcrumb.addItem("Cart", `${origin}/cart/index.html`);
}

// Renders breadcrumb to DOM
breadcrumb.render();
