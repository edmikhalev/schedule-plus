import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
	setup() {
		const theme = ref('light')
		const toggleTheme = () => {
			document.documentElement.classList.toggle('dark')
			theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
		}
		return () => (
			<div class="layout">
				<header>
					<button onClick={toggleTheme}>{theme.value}</button>
				</header>
				<main>
					<RouterView />
				</main>
			</div>
		)
	},
})
