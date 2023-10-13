import { getParam } from "./utils.mjs";
import { renderHeaderFooter } from "./utils.mjs";

import productDetails from "./productDetails.mjs";

renderHeaderFooter();

const productId = getParam("product");

productDetails(productId, ".product-detail");


