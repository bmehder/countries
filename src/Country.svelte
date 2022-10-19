<script type="ts">
  import { clickOutside } from './actions'
  import { country } from './stores'

  const map = $country.maps.googleMaps
  const flag = $country.flags.svg
  const name = $country.name.common
  const altSpellings = $country.altSpellings?.join(', ')
  const official = $country.name.official
  const capital = $country.capital
  const region = $country.region
  const subregion = $country.subregion
  const area = $country.area.toLocaleString('en-US')
  const population = $country.population.toLocaleString('en-US')
  const tld = $country.tld?.join(', ')
  const isLandlocked = $country.landlocked
  const BORDER_URL = 'https://restcountries.com/v3/alpha/'

  let isBordersOpen = false

  const borders = $country.borders

  const fetchBorders = () => borders?.map(border => fetch(BORDER_URL + border))

  const getBorders = () => {
    if (!borders) return

    return Promise.all(fetchBorders())
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => data.flat())
      .catch(err => console.error('Yo', err))
  }

  const handleKeydown = evt =>
    evt.key === 'Enter' && (isBordersOpen = !isBordersOpen)

  const showAll = () => ($country = null)
</script>

<svelte:head>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<svelte:body on:keydown={handleKeydown} />

<aside use:clickOutside={showAll}>
  <span on:click|preventDefault={showAll}>
    <i class="fa fa-times-circle" />
  </span>
  <h2>
    <a href={map} target="_blank">
      <img src={flag} alt={name} />
    </a>
  </h2>
  <h3>{official}</h3>
  <h4><em>({name})</em></h4>
  <p><strong>{tld}</strong></p>

  <div>
    <p><strong>Alternate Names:</strong></p>
    <p>{altSpellings}</p>
    <p><strong>Capital:</strong> {capital.join(', ')}</p>
    <p><strong>Region:</strong> {region} ({subregion})</p>
    <p><strong>Area:</strong> {area} km<sup>2</sup></p>
    <p><strong>Population:</strong> {population}</p>
    <p><strong>Landlocked:</strong> {isLandlocked}</p>
    <details open={isBordersOpen}>
      <summary>Bordering Countries</summary>
      {#await getBorders() then borders}
        <ul>
          {#each borders || [] as border}
            <li>{border.name.common}</li>
          {:else}
            <li>None</li>
          {/each}
        </ul>
      {/await}
    </details>
  </div>
</aside>

<style>
  aside {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    max-width: 400px;
    margin: 1rem auto;
    padding: 2rem;
    text-align: center;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.24);
  }
  span {
    position: absolute;
    top: -1rem;
    right: -1rem;
    cursor: pointer;
  }
  span i {
    font-size: 2rem;
    transition: transform 100ms ease-in-out;
  }
  span i:hover {
    color: tomato;
    transform: scale(0.95);
  }
  div {
    width: 100%;
    text-align: left;
    line-height: 2rem;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.24);
  }
  h2 {
    margin-block: 1rem;
  }
  details {
    cursor: pointer;
  }
  summary {
    font-weight: bold;
    margin: -0.5em -0.5em;
    padding: 0.5em;
  }
  details li {
    display: block;
    font-family: unset;
    list-style: disc;
    padding: 0;
  }
  sup {
    position: relative;
    top: -0.5em;
    vertical-align: baseline;
    font-size: 75%;
    line-height: 0;
  }
</style>
