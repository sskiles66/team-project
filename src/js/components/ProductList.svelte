<script>
  import {getProductsByCategory} from "../externalServices.mjs";
  import DiscountedPrice from "./DiscountedPrice.svelte";

  // this is how we make a prop in svelte
  export let category;
  // if you are looking at this thinking that's strange to just stop with a promise
  // you would be right.  This will make more sense in a bit...stay tuned.
  let promise = getProductsByCategory(category);

  let value = localStorage.getItem("searchValue")

  console.log(value);
  //console.log(promise.data)

  let filteredData = []

  promise.then(data => {
  filteredData = data.filter(product => product.Name.includes(value));
  console.log(filteredData);
});

</script>

<p>Top products: {category}</p>

{#await filteredData}
  <p>...waiting</p>

{:then data}
  {#if data.length != 0}
  <ul class="product-list">

    {#each data as product}
      <li class="product-card">
        <a href="/product_pages/index.html?product={product.Id}">
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
  {:else}
  <p style="color: red">Sorry, there are no items with {value}. Try resetting the value in the search bar</p>
  {/if}

{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

