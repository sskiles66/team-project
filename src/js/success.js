import { renderHeaderFooter } from "./utils.mjs";

import { setLocalStorage } from "./utils.mjs";

import { cartCount } from "./stores.mjs";

renderHeaderFooter();

setLocalStorage("so-cart", []);

cartCount.set(0);
