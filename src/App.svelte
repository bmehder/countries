<script context="module" lang="ts">
  const URL = 'https://restcountries.com/v3.1'

  let total: number = 0

  const allResults = fetch(URL + '/all')
    .then(response => response.json())
    .then(data => {
      total = data.reduce((acc, item) => (acc += item.population), 0)
      return data.status !== 404 ? data : []
    })
    .catch(err => console.error('yo', err))
</script>

<script lang="ts">
  import { value } from './stores'

  import Header from './Header.svelte'
  import Spinner from './Spinner.svelte'
  import Population from './Population.svelte'
  import Headings from './Headings.svelte'
  import Row from './Row.svelte'
  import Country from './Country.svelte'

  let country: {} | null = null

  $: isCountrySelected = !!country

  $: getData = async (url: string) => {
    if (allResults && !$value) return allResults

    return fetch(`${url}/name/${$value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(data => (data.status !== 404 ? data : []))
      .catch(err => console.error('Yo', err))
  }

  const handleKeydown = (evt: KeyboardEvent): void => evt.key === 'Escape' && (country = null)
</script>

<svelte:body on:keydown={handleKeydown} />

<Header {isCountrySelected} on:input={() => (country = null)} />

<main>
  {#if isCountrySelected}
    <Country bind:country />
  {/if}

  {#if !isCountrySelected}
    {#await getData(URL)}
      <Spinner />
    {:then data}
      <Population {total} />
      <Headings />
      {@const sortedData = (data && [...data].sort((a, b) => b.population - a.population)) || []}
      <ul>
        {#each sortedData as item, index}
          <Row {index} {item} {total} on:click={() => (country = item)} />
        {:else}
          <li>No results</li>
        {/each}
      </ul>
    {/await}
  {/if}
</main>

<style>
  main {
    max-width: 740px;
    margin: auto;
    padding: 1rem;
  }
</style>
