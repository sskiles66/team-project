import ProductList from "./components/ProductList.svelte";
import displaySuperscript from "./superscript.mjs";

new ProductList({
  target: document.querySelector(".products"),
  props: { category: "tents" },
});

displaySuperscript()
