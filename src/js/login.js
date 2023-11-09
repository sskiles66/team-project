import {renderHeaderFooter,} from "./utils.mjs";
import { getParam } from "./utils.mjs";
import { login, checkLogin } from "./auth.mjs";



renderHeaderFooter();

const urlParam = getParam("redirect");

document.querySelector("#submitButton").addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    login({username, password}, urlParam);

});




