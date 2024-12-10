<template>
	<div class="sp-card bg-gray-100 dark:bg-gray-900 flex flex-col shadow rounded-md">
		<div class="sp-card__header p-6" v-if="showHeader">
			<slot name="header" />
		</div>
		<div class="sp-card__content p-6" :class="contentClass">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()

const showHeader = computed(() => slots.header)

const contentClass = computed(() => {
	return {
		'pt-0': showHeader.value,
	}
})
</script>
