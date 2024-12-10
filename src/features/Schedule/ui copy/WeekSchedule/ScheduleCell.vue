<template>
	<div
		:style="styles"
		class="p-1 px-2 box-border flex flex-grow flex-shrink-0 relative"
		@click="$emit('select')"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { toPx } from '@/shared/libs'
import { computed } from 'vue'

const props = defineProps({
	width: {
		type: [Number, String],
		required: true,
	},
	height: {
		type: [Number, String],
		required: true,
	},
})

defineEmits(['select'])

const styles = computed(() => ({
	minWidth: toPx(props.width),
	minHeight: toPx(props.height),
}))
</script>
