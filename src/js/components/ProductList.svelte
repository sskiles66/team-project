<script>
    import { getData } from "../productData.mjs";
    
    // this is how we make a prop in svelte
    export let category;
    // if you are looking at this thinking that's strange to just stop with a promise
        // you would be right.  This will make more sense in a bit...stay tuned.
    let promise = getData(category);
    //console.log(promise.data)

    const validIds = ["880RR", "985RF", "985PR","344YJ"];

    let filteredPromise = promise.then(data => {
  return data.filter(product => validIds.includes(product.Id));
    });

    
</script>

<p>Top products: {category}</p>


{#await filteredPromise}
	<p>...waiting</p>
{:then data}
    <ul class="product-list">

    {#each data as product}
    <li class="product-card">
        <a href="product_pages/index.html?product={product.Id}">
          <img
            src={product.Image}
            alt={product.Name}
          />
          <h3 class="card__brand">{product.Brand.Name}</h3>
          <h2 class="card__name">{product.Name}</h2>
          <p class="product-card__price">{product.ListPrice}</p></a
        >
      </li>
    {/each}
</ul>

{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

