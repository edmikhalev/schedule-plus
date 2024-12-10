/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar'
module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'selector',
	theme: {
		extend: {
			fontSize: {
				ex: ['9px', '16px'],
				sx: ['12px', '18px'],
				sm: ['14px', '24px'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [tailwindScrollbar],
}
