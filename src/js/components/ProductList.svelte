<script>
  import {getData} from "../productData.mjs";
  import DiscountedPrice from "./DiscountedPrice.svelte";

  // this is how we make a prop in svelte
  export let category;
  // if you are looking at this thinking that's strange to just stop with a promise
  // you would be right.  This will make more sense in a bit...stay tuned.
  let promise = getData(category);
  //console.log(promise.data)



</script>

<p>Top products: {category}</p>

{#await promise}
  <p>...waiting</p>
{:then data}
  <ul class="product-list">

    {#each data as product}
      <li class="product-card">
        <a href="product_pages/index.html?product={product.Id}">
          <img
            src={product.Images.PrimaryMedium}
            alt={product.Name}
          />
          <h3 class="card__brand">{product.Brand.Name}</h3>
          <h2 class="card__name">{product.Name}</h2>
          <s class="product-card__price">{product.ListPrice}</s>
          <DiscountedPrice finalPrice={product.FinalPrice}/>
        </a>
      </li>
    {/each}
  </ul>

{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

