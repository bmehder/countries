<script>
  import { viewport } from './actions'
  import { isShowBackToTop } from './stores'

  export let total = 0
</script>

<h3
  use:viewport
  on:enterViewport={() => ($isShowBackToTop = false)}
  on:exitViewport={() => ($isShowBackToTop = true)}
>
  Population of 🌎 = {total?.toLocaleString('en-GB')}
</h3>

<style>
  h3 {
    text-align: center;
    margin-block: 1rem;
  }
</style>
