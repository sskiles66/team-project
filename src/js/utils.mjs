import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";
import AlertMessage from "./components/AlertMessage.svelte";


// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getCartAmount(){
  const cart = getLocalStorage("so-cart");
  if (cart != null){
  
    return cart.length;
  }
  
  return 0;
}

export function renderHeaderFooter(){
  new MainHeader({
    target: document.querySelector("#main-header"),
    props: {cartCount: getCartAmount()}
}),
  new MainFooter({
  target: document.querySelector("#main-footer")
})};


export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
};

// takes a form element and returns an object where the key is the "name" of the form input.
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function alertMessage(message, scroll=true, duration = 3000){
  const alert = new AlertMessage({
    target: document.querySelector("#target"),
    props: {message: message}
});

  setTimeout(function () {
      alert.$destroy();
    }, duration);
}