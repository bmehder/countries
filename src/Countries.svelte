<script context="module" lang="ts">
  const URL = 'https://restcountries.com/v3.1'

  let total = 0

  const allResults = fetch(URL + '/all')
    .then(response => response.json())
    .then(data => {
      total = data.reduce((acc, item) => (acc += item.population), 0)
      return data.status !== 404 ? data : []
    })
    .catch(err => console.error('yo', err))
</script>

<script lang="ts">
  import { scale } from 'svelte/transition'

  import { value, isCountrySelected, country } from './stores'

  import Spinner from './Spinner.svelte'
  import Population from './Population.svelte'
  import Row from './Row.svelte'
  import Country from './Country.svelte'

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

  const showAllCountries = () => ($country = null)

  const handleKeydown = (evt: KeyboardEvent): void =>
    evt.key === 'Escape' && showAllCountries()
</script>

<svelte:body on:keydown={handleKeydown} />

<main>
  {#if !$isCountrySelected}
    <div>
      {#await getData(URL)}
        <Spinner />
      {:then data}
        {@const sortedData =
          (data && [...data].sort((a, b) => b.population - a.population)) || []}
        <Population {total} />
        <ul>
          <li>
            <span>Rank</span>
            <span>Country</span>
            <span>Population</span>
            <span>Percent</span>
          </li>
          {#each sortedData as item, index}
            <Row {index} {item} {total} on:click={() => ($country = item)} />
          {:else}
            <li>No results</li>
          {/each}
        </ul>
      {/await}
    </div>
  {:else}
    <div transition:scale>
      <Country />
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 740px;
    margin: auto;
    padding: 1rem;
  }
  span {
    font-weight: bold;
  }
</style>
