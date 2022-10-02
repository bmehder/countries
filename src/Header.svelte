<script lang="ts">
  export let value: string
  export let country: {}

  let inputElement

  const handleKeydown = evt => {
    evt.key === 'Enter' && !value && inputElement.focus()
    evt.key === 'Escape' && !country && (value = '')
  }
</script>

<header>
  <h1>Country Pop</h1>
  <input
    bind:this={inputElement}
    bind:value
    autocomplete="off"
    placeholder="Type country name..."
    disabled={!!country}
    on:input
  />
  {#if value && !country}
    <span on:click|preventDefault={() => (value = '')}>clear search</span>
  {/if}
</header>

<svelte:body on:keydown={handleKeydown} />

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
