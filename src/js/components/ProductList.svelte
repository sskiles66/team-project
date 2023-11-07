<script>
  import {getProductsByCategory} from "../externalServices.mjs";
  import {getLocalStorage, setLocalStorage} from "../utils.mjs";
  import DiscountedPrice from "./DiscountedPrice.svelte";

  // this is how we make a prop in svelte
  export let category;

  let promise = getProductsByCategory(category);
  let value = localStorage.getItem("searchValue");
  let min = getLocalStorage("min");
  let max = getLocalStorage("max");

  if (min == null || max == null) {
    min.value = 0;
    max.value = 200;
    setLocalStorage("min", 0);
    setLocalStorage("max", 200);
  }

  let filteredData = [];

  promise.then(data => {
    filteredData = data.filter(product =>
      product.Name.includes(value) &&
      product.FinalPrice >= min && // Minimum price
      product.FinalPrice <= max // Maximum price
    );
  });

  function openModal(product) {
    console.log(product);
    document.querySelector("#modal").style.display = "block";
    document.querySelector("#modal-text").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#modal-img").src = product.Images.PrimaryLarge;
  }

  function closeModal() {
    document.querySelector("#modal").style.display = "none";
  }

</script>

<p>Top products: {category} between ${getLocalStorage("min")} and ${getLocalStorage("max")}</p>

{#await filteredData}
  <p>...waiting</p>
{:then data}
  {@const randomProduct1 = Math.floor(Math.random() * data.length)}
  {@const randomProduct2 = Math.floor(Math.random() * data.length)}
  {@const randomProduct3 = Math.floor(Math.random() * data.length)}

  {#if data.length !== 0}
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
          <button on:click={() => openModal(product)} id="modal-view">Quick View</button>
        </li>
      {/each}
    </ul>

    <h1>Recommended Products:</h1>
    <ul class="random__products">
      {#each [randomProduct1, randomProduct2, randomProduct3] as randomProduct}
        {#if data[randomProduct]}
          <li class="random__products__card product-card">
            <a href="/product_pages/index.html?product={data[randomProduct].Id}">
              <img src={data[randomProduct].Images.PrimaryMedium} alt={data[randomProduct].Name}/>
              <h3 class="card__brand">{data[randomProduct].Brand.Name}</h3>
              <h2 class="card__name">{data[randomProduct].Name}</h2>
              <s class="product-card__price">{data[randomProduct].ListPrice}</s>
              <DiscountedPrice finalPrice={data[randomProduct].FinalPrice}/>
            </a>
            <button on:click={() => openModal(data[randomProduct])} id="modal-view">Quick View</button>
          </li>
        {/if}
      {/each}
    </ul>

    <div id="modal">
      <div id="modal-content">
        <button on:click={closeModal} class="close-prod-list">&times;</button>
        <p id="modal-text">test for now</p>
        <img id="modal-img" src="#" alt="">
      </div>
    </div>
  {:else}
    <p style="color: red">Sorry, there are no items with the current settings. Try resetting the value in the search bar
      or adjust the range of price.</p>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
  .random__products {
    display: flex;
    gap: 16px;
    list-style-type: none;
    overflow-x: auto;
  }

  .random__products__card {
    padding: 32px;
  }
</style>
