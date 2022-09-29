<script>
  export let value
</script>

<header>
  <h1>Country Pop</h1>
  <input bind:value autocomplete="off" placeholder="Search for a country..." on:input />
  {#if value}
    <a href on:click|preventDefault={() => (value = '')}>clear search</a>
  {/if}
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: tomato;
  }
  h1 {
    margin-block: 1rem;
    text-align: center;
  }
  input {
    display: block;
  }
  a {
    color: white;
    text-decoration: underline;
  }
  a:hover {
    text-decoration: none;
  }
</style>
