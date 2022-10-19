<script lang="ts">
  import { value } from './stores'

  import BackToTop from './BackToTop.svelte'

  export let isCountrySelected: boolean

  const handleKeydown = evt =>
    evt.key === 'Escape' && !isCountrySelected && ($value = '')
</script>

<svelte:body on:keydown={handleKeydown} />

<header>
  <h1>Country Pop</h1>
  <input
    bind:value={$value}
    autocomplete="off"
    placeholder="Type country name..."
    disabled={isCountrySelected}
    on:input
  />
  {#if $value && !isCountrySelected}
    <span on:click|preventDefault={() => ($value = '')}>clear search</span>
  {/if}
</header>

<BackToTop {isCountrySelected} />

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
    cursor: pointer;
  }
  span:hover {
    text-decoration: none;
  }
</style>
