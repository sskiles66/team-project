import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";
import AlertMessage from "./components/AlertMessage.svelte";

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCartAmount() {
  const cart = getLocalStorage("so-cart");
  if (cart != null) {
    return cart.length;
  }
  return 0;
}

export function renderHeaderFooter() {
  const mainHeader = new MainHeader({
    target: document.querySelector("#main-header"),
    props: {cartCount: getCartAmount()}
  });
  const mainFooter = new MainFooter({
    target: document.querySelector("#main-footer")
  });

  return {mainHeader, mainFooter};
}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// takes a form element and returns an object where the key is the "name" of the form input.
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = new AlertMessage({
    target: document.querySelector("#target"),
    props: {message: message}
  });

  setTimeout(function () {
    alert.$destroy();
  }, duration);
}
