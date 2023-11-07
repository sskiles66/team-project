import { getParam, renderHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");

renderHeaderFooter();
productDetails(productId, ".product-detail");
