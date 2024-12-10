import { defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'

export const MODAL_STORE_NAME = 'modal'

export const useBaseModalStore = defineStore(MODAL_STORE_NAME, () => {
	const modals = shallowRef<string[]>([])

	function getModalIndexById(id: string): number {
		return modals.value.indexOf(id)
	}

	function isOpen(id: string): boolean {
		return modals.value.includes(id)
	}

	function close(id: string): void {
		if (isOpen(id)) return
		modals.value = modals.value.splice(getModalIndexById(id), 1)
	}

	function open(id: string): void {
		if (isOpen(id)) return
		modals.value.push(id)
	}

	return {
		modals,
		isOpen,
		open,
		close,
	}
})

export const createModalStore = (id: string) => {
	const store = useBaseModalStore()

	const isOpen = computed(() => store.modals.includes(id))

	return {
		close: () => store.close(id),
		open: () => store.open(id),
		isOpen,
	}
}

export const useModal = (id: string) => createModalStore(id)
