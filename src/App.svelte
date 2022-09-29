<script context="module">
  const URL = 'https://restcountries.com/v3.1'

  let total

  const allResults = fetch(URL + '/all')
    .then(response => response.json())
    .then(data => {
      total = data.reduce((acc, item) => (acc += item.population), 0)
      return data.status !== 404 ? data : []
    })
    .catch(err => console.error(err))
</script>

<script>
  import Header from './Header.svelte'
  import Spinner from './Spinner.svelte'
  import Population from './Population.svelte'
  import Headings from './Headings.svelte'
  import Row from './Row.svelte'
  import Country from './Country.svelte'

  let value = ''
  let country = ''

  $: getData = async url => {
    if (allResults && !value) return allResults

    return fetch(`${url}/name/${value}`)
      .then(response => response.json())
      .then(data => (data.status !== 404 ? data : []))
      .catch(err => console.error('Yo', err))
  }
</script>

<Header bind:value {country} on:input={() => (country = null)} />
<main>
  {#if country}
    <Country {country} on:click={() => (country = null)} />
  {:else}
    {#await getData(URL)}
      <Spinner />
    {:then data}
      <Population {total} />
      <Headings />
      {@const sortedData = [...data].sort((a, b) => b.population - a.population)}
      <ul>
        {#each sortedData as item, index}
          <Row {index} {item} {total} on:click={() => (country = item)} />
        {:else}
          <li>No results</li>
        {/each}
      </ul>
    {:catch error}
      <p>{error}</p>
    {/await}
  {/if}
</main>

<style>
  main {
    max-width: 740px;
    margin: auto;
    padding: 1rem;
  }
  :global(li) {
    display: grid;
    grid-template-columns: minmax(2em, 1fr) 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0.25rem;
    font-family: monospace;
  }
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :global(body) {
    padding: 0;
  }
</style>
