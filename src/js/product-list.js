import ProductList from "./components/ProductList.svelte";
import { getParam } from "./utils.mjs";

function setValue() {
  let value = document.querySelector("#searchValue").value;
  localStorage.setItem("searchValue", value);
  window.location.reload();
}

document.querySelector("#searchValue").value =
  localStorage.getItem("searchValue");

const productId = getParam("category");

const searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", setValue);

new ProductList({
  target: document.querySelector(".products"),
  props: { category: productId },
});
