import { reactive } from 'vue'
import { defineStore } from 'pinia'

import type { ScheduleSettings } from '.'

const useLocalStorage = <T>(key: string) => {
	return {
		save(data: T) {
			localStorage.setItem(key, JSON.stringify(data))
		},
		get(): T | void {
			const item = localStorage.getItem(key)
			if (item) {
				return JSON.parse(item)
			}
			return
		},
		remove(): void {
			localStorage.removeItem(key)
		},
	}
}

export const useScheduleSettingsStore = defineStore('schedule-settings', () => {
	const settings = reactive<ScheduleSettings>({
		timeSlots: [],
	})
	const storage = useLocalStorage<ScheduleSettings>('settings')

	function save(): void {
		storage.save(settings)
	}

	return {
		settings,
		save,
	}
})
