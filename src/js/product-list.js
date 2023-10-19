import ProductList from "./components/ProductList.svelte";
import { getParam } from "./utils.mjs";

const productId = getParam("category");

new ProductList({
  target: document.querySelector(".products"),
  props: { category: productId },
});
