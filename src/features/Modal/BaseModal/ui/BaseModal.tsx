import { defineComponent, reactive, Teleport } from 'vue'
import './styles.css'
import { createModalStore } from '../model'

export default defineComponent({
	props: {
		modalId: {
			type: String,
			required: true,
		},
		teleport: {
			type: String,
			default: () => 'body',
		},
		fullscreen: {
			type: Boolean,
		},
	},
	setup(props) {
		const modalStore = createModalStore(props.modalId)

		const styles = reactive({
			'w-full': props.fullscreen,
			'h-full': props.fullscreen,
			'base-modal': true,
		})

		return () => (
			<Teleport to={props.teleport}>
				<div v-show={modalStore.isOpen} class={styles}>
					<div class="base-modal__content">
						<div>The Base Modal</div>
						<slot />
					</div>
					<div class="base-modal__footer border-t">
						<button>закрыть</button>
					</div>
				</div>
			</Teleport>
		)
	},
})
