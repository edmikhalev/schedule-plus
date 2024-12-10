import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { SETTINGS_STORE_NAME, THEME_MODE_STORAGE_KEY } from '../consts'
import { ThemeMode } from '../types'

export const useSettingsStore = defineStore(SETTINGS_STORE_NAME, () => {
	const themeMode = ref<ThemeMode>(getThemeMode())

	function getThemeMode(): ThemeMode {
		const mode = localStorage.getItem(THEME_MODE_STORAGE_KEY)
		if (mode) {
			return mode as ThemeMode
		}

		return getSystemThemeMode()
	}

	function getSystemThemeMode(): ThemeMode {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? ThemeMode.Dark
			: ThemeMode.Light
	}

	function toggleTheme(): void {
		themeMode.value = themeMode.value === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
		localStorage.setItem(THEME_MODE_STORAGE_KEY, themeMode.value)
	}

	function setSystemThemeMode(): void {
		themeMode.value = getSystemThemeMode()
		localStorage.removeItem(THEME_MODE_STORAGE_KEY)
	}

	watch(
		themeMode,
		() => {
			if (themeMode.value === ThemeMode.Dark) {
				document.documentElement.classList.add(ThemeMode.Dark)
				return
			}

			document.documentElement.classList.remove(ThemeMode.Dark)
		},
		{ immediate: true },
	)

	return {
		themeMode,

		toggleTheme,
		setSystemThemeMode,
	}
})
