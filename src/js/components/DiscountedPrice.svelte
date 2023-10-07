<script>
  export let finalPrice;
  export let discountPercentage;

  import {calculateDiscount} from "../calculateDiscount.mjs";
</script>

<p>${calculateDiscount(finalPrice, discountPercentage)}</p>
