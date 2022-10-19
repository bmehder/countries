<script>
  import { isShowBackToTop } from './stores'

  export let isCountrySelected

  const handleClick = () => scrollTo({ top: 0, behavior: 'smooth' })
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  class="w-6 h-6"
  class:show={$isShowBackToTop && !isCountrySelected}
  on:click={handleClick}
>
  <path
    fill-rule="evenodd"
    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
    clip-rule="evenodd"
  />
</svg>

<style>
  svg {
    width: 3rem;
    height: 3rem;
    position: fixed;
    bottom: 2rem;
    right: 3rem;
    opacity: 0;
    transition: opacity 300ms ease-in-out 500ms, scale 300ms ease-in-out;
    cursor: pointer;
  }
  svg.show {
    opacity: 1;
  }
  svg.show:hover {
    color: tomato;
    scale: 0.95;
  }
</style>
