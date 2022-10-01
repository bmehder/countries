<script>
  export let country

  const map = country.maps.googleMaps
  const flag = country.flags.svg
  const name = country.name.common
  const altSpellings = country.altSpellings?.join(', ')
  const official = country.name.official
  const capital = country.capital
  const region = country.region
  const subregion = country.subregion
  const area = country.area.toLocaleString('en-US')
  const population = country.population.toLocaleString('en-US')
  const tld = country.tld?.join(', ')
  const isLandlocked = country.landlocked

  let borders = []
  let isDone = false

  !country.borders && (isDone = true)

  country.borders?.map((border, index, array) => {
    isDone = false
    return fetch(`https://restcountries.com/v3/alpha/${border}`)
      .then(res => res.json())
      .then(data => (borders = [...borders, data[0].name.common]))
      .catch(err => console.error(err))
      .finally(() => array.length - 1 === index && setTimeout(() => (isDone = true), 400))
  })
</script>

<svelte:head>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <span on:click|preventDefault><i class="fa fa-times-circle" /> </span>
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
    <details>
      <summary>Bordering Countries</summary>
      {#if borders.length === 0 && isDone}
        <p>None</p>
      {:else}
        {#each borders as border}
          <li>{border}</li>
        {/each}
      {/if}
    </details>
  </div>
</main>

<style>
  main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    max-width: 400px;
    margin: 1rem auto;
    padding: 2rem;
    text-align: center;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.24);
  }
  a {
    text-decoration: underline;
  }
  a:hover {
    text-decoration: none;
  }
  span {
    position: absolute;
    top: -1.5rem;
    right: -1.5rem;
    cursor: pointer;
  }
  span i {
    font-size: 3rem;
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
    width: 200px;
    height: auto;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.24);
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
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }
</style>
