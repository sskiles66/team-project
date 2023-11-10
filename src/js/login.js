import { renderHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import { login, checkLogin } from "./auth.mjs";

renderHeaderFooter();

const redirect = getParam("redirect");

document.querySelector("#loginButton").addEventListener("click", (e) => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  console.log(email);
  console.log(password);
  login({ email, password }, redirect);
});
