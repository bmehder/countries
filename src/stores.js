import { writable } from 'svelte/store'

export const value = writable('')

export const country = writable(null)

export const isShowBackToTop = writable(false)

export const isCountrySelected = writable(false)
