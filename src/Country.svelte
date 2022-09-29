<script>
  export let country

  const map = country.maps.googleMaps
  const flag = country.flags.svg
  const name = country.name.common
  const official = country.name.official
  const capital = country.capital
  const region = country.region
  const subregion = country.subregion
  const area = country.area.toLocaleString('en-US')
  const population = country.population.toLocaleString('en-US')
  const tld = country.tld?.join(', ')
  let borders = []
  const isLandlocked = country.landlocked

  country.borders?.map(border => {
    return fetch(`https://restcountries.com/v3/alpha/${border}`)
      .then(res => res.json())
      .then(data => (borders = [...borders, data[0].name.common]))
  })
</script>

<main>
  <a href on:click|preventDefault>Go Back</a>
  <h2>
    <a href={map} target="_blank">
      <img src={flag} alt={name} />
    </a>
  </h2>
  <h3>{official}</h3>
  <h4><em>({name})</em></h4>
  <div>
    <p><strong>Capital:</strong> {capital}</p>
    <p><strong>Region:</strong> {region} ({subregion})</p>
    <p><strong>Area:</strong> {area} km<sup>2</sup></p>
    <p><strong>Population:</strong> {population}</p>
    <p><strong>TLD:</strong> {tld}</p>
    {#if borders.length}
      <p><strong>Bordering:</strong> {borders.join(', ')}</p>
    {/if}
    <p><strong>Landlocked:</strong> {isLandlocked}</p>
  </div>
</main>

<style>
  main {
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
  div {
    text-align: left;
    line-height: 2rem;
  }
  img {
    display: block;
    width: 200px;
    height: auto;
    box-shadow: 0 0 1px #999;
  }
</style>
