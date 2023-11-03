import ProductList from "./components/ProductList.svelte";
import { getParam } from "./utils.mjs";

function setValue() {
  let value = document.querySelector("#searchValue").value;
  let min = document.querySelector("#min").value;
  let max = document.querySelector("#max").value;
  localStorage.setItem("searchValue", value);
  localStorage.setItem("min", min);
  localStorage.setItem("max", max);
  window.location.reload();
}

document.querySelector("#searchValue").value =
  localStorage.getItem("searchValue");

document.querySelector("#min").value = localStorage.getItem("min");

document.querySelector("#max").value = localStorage.getItem("max");

const productId = getParam("category");

const searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", setValue);

new ProductList({
  target: document.querySelector(".products"),
  props: { category: productId },
});
