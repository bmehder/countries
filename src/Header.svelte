<script lang="ts">
  import { value, isCountrySelected, country } from './stores'

  const handleKeydown = evt =>
    evt.key === 'Escape' && !$isCountrySelected && ($value = '')

  const handleInput = () => ($country = null)

  const handleClick = () => ($value = '')

  $: isShowClearInput = $value && !$isCountrySelected
  $: disabled = $isCountrySelected
</script>

<svelte:body on:keydown={handleKeydown} />

<header>
  <h1>Country Pop</h1>
  <input
    bind:value={$value}
    autocomplete="off"
    placeholder="Type country name..."
    {disabled}
    on:input={handleInput}
  />
  {#if isShowClearInput}
    <span on:click={handleClick}>clear search</span>
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
    cursor: pointer;
  }
  span:hover {
    text-decoration: none;
  }
</style>
