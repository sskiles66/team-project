import CheckoutForm from "./components/CheckoutForm.svelte";

// import { alertMessage } from "./utils.mjs";

// alertMessage("this is a test");

new CheckoutForm({
  target: document.querySelector(".products"),
});
