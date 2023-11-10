import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";


const tokenKey = "so-token";



function isTokenValid(token) {

    if (token) {

        const decoded = jwtDecode(token);

        let currentDate = new Date();

        if (decoded.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            return false;
        } else {
            console.log("Valid token");
            return true;
        }
    } else return false;
}

export function checkLogin(){
    const token = getLocalStorage("so-token");
    if (isTokenValid(token)){
        return token;
    }else{
        localStorage.removeItem("so-token");
        const location = window.location;
        window.location = `/login/index.html?redirect=${location.pathname}`;
    }
}

export async function login(creds, redirect = "/") {
    try {
        console.log(creds);
      const token = await loginRequest(creds);
      setLocalStorage(tokenKey, token);
      window.location = redirect;
    } catch (err) {
      alertMessage(err.message.message);
    }
  }