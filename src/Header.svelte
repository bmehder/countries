<script lang="ts">
  export let value: string
  export let country: {}
</script>

<header>
  <h1>Country Pop</h1>
  <input bind:value autocomplete="off" placeholder="Type country name..." on:input />
  {#if value && !country}
    <span on:click|preventDefault={() => (value = '')}>clear search</span>
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
  span {
    color: white;
    text-decoration: underline;
  }
  span:hover {
    text-decoration: none;
  }
</style>
