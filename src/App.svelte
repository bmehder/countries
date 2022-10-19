<script lang="ts">
  import { isCountrySelected, country } from './stores'

  import Header from './Header.svelte'
  import Countries from './Countries.svelte'
  import BackToTop from './BackToTop.svelte'

  const isEscapeKey = key => key === 'Escape'
  const showAllCountries = () => ($country = null)

  const handleKeydown = (evt: KeyboardEvent): void =>
    isEscapeKey(evt.key) && showAllCountries()

  $: $isCountrySelected = !!$country
</script>

<svelte:body on:keydown={handleKeydown} />

<Header on:input={() => ($country = null)} />

<Countries />

<BackToTop />
