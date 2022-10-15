<script>
  export let index, item
  export let total = 0

  const name = item.name.common
  const population = item.population.toLocaleString('en-US')
  const popPercent = ((item.population * 100) / total).toFixed(2)
  const flag = item.flags.svg
</script>

<li>
  <span>{index + 1}</span>
  <span>
    <a href on:click|preventDefault>
      <img src={flag} alt="{name} flag" />
      {name}
    </a>
  </span>
  <span>{population}</span>
  <span>{popPercent}%</span>
</li>

<style>
  li:nth-child(odd) {
    background-color: #f1f1f1;
  }
  img {
    display: inline-block;
    width: 1rem;
    box-shadow: 0 0 1px black;
  }
  a {
    text-decoration: none;
  }
</style>
