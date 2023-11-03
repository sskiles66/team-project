<script>
  import {alertMessage, formDataToJSON, getLocalStorage} from "../utils.mjs";
  import {calculateDiscount} from "../calculateDiscount.mjs";
  import {checkout} from "../externalServices.mjs";

  let length = getLocalStorage("so-cart").length;
  let subtotal = getSubTotalCost();
  let shippingEstimate = getShippingCost();
  let totalAndShipping = subtotal + shippingEstimate;
  let tax = totalAndShipping * 0.06;
  let orderTotal = totalAndShipping + tax;

  function getSubTotalCost() {
    let total = 0;
    const cartItems = getLocalStorage("so-cart");

    cartItems.forEach((element) => {
      total += parseFloat(calculateDiscount(element.ListPrice));
    });
    return total;
  }

  function getShippingCost() {
    let total = 0;
    for (let i = 0; i < length; i++) {
      if (i === 0) {
        total += 10;
      } else {
        total += 2;
      }
    }

    return total;
  }

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    return items.map((item) => {
      return {
        id: item.Id,
        name: item.Name,
        price: item.ListPrice,
        quantity: 1
      };
    });
  }

  const handleSubmit = async function () {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    // remember that the form that was submitted can be found two ways...this or e.target 
    // call the checkout method in our externalServices module and send it our data object.

    const json = formDataToJSON(this);
    json.orderDate = new Date();
    json.orderTotal = orderTotal;
    json.tax = tax;
    json.shipping = shippingEstimate;
    json.items = packageItems(getLocalStorage("so-cart"));

    try {
      const res = await checkout(json);
      if (res.ok) {
        alertMessage("Order was successfully submitted!");
        window.location.href = "success.html";
      }
    } catch (err) {
      alertMessage(err);
    }
  };
</script>

<div>
  <form name="checkout" on:submit|preventDefault={handleSubmit}>
    <p>Shipping Information</p>
    <label for="fname">First name:</label><br>
    <input type="text" id="fname" name="fname" value="John" required><br>

    <label for="lname">Last name:</label><br>
    <input type="text" id="lname" name="lname" value="Smith" required><br>

    <label for="street">Street:</label><br>
    <input type="text" id="street" name="street" value="Street" required><br>

    <label for="city">City:</label><br>
    <input type="text" id="city" name="city" value="City" required><br>

    <label for="state">State:</label><br>
    <input type="text" id="state" name="state" value="ID" required><br>

    <label for="zip">Zipcode:</label><br>
    <input type="number" id="zip" name="zip" value="Zipcode" required><br>

    <p>Payment</p>

    <label for="cardNumber">Card Number:</label><br>
    <input type="number" id="cardNumber" name="cardNumber" value=1234123412341234 required><br>

    <label for="expiration">Expiration:</label><br>
    <input name="expiration" required placeholder="mm/yy"><br>

    <label for="code">Security Code:</label><br>
    <input type="number" id="code" name="code" value=123 required><br>

    <p>Order Summary</p>

    <p>Item Subtotal: ({length}) ${subtotal}</p>
    <p>Shipping Estimate: ${shippingEstimate}</p>
    <p>Tax: ${parseInt(tax.toFixed(2))}</p>
    <p>Order Total: ${orderTotal.toFixed(2)}</p>

    <button id="checkoutSubmit" type="submit">Checkout</button>
  </form>
</div>

<style>
  form {
    margin-top: 0;
  }

  /* Style the form container */
  div {
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  /* Style the form headings */
  p {
    font-weight: bold;
    font-size: 18px;
    margin-top: 10px;
  }

  /* Style the labels */
  label {
    display: block;
    font-weight: bold;
    margin-top: 10px;
  }

  /* Style the input fields */
  input {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  /* Style the submit button */
  #checkoutSubmit {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
  }

  /* Add hover effect to the submit button */
  #checkoutSubmit:hover {
    background-color: #0056b3;
  }
</style>
