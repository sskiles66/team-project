<script>
  // Import the 'calculateDiscount' function from the 'calculateDiscount.mjs' module.
  import {calculateDiscount} from "../calculateDiscount.mjs";

  // Define a prop 'finalPrice' that will be passed into this component.
  export let finalPrice;
</script>

<!-- Display the result of calculating the discount using 'calculateDiscount' function. -->
<p>${calculateDiscount(finalPrice)}</p>
