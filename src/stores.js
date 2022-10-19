import { writable } from 'svelte/store'

export const value = writable('')

export const isShowBackToTop = writable(false)

export const isCountrySelected = writable(false)

export const country = writable(null)
