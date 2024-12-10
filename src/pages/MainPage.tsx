// import { BaseModal } from '@/features/Modal/BaseModal'
import { CSchedule, type CellSLot, type ScheduleDataItem } from '@/features/Schedule'
import { defineComponent, ref } from 'vue'
import './styles.css'

export default defineComponent({
	setup() {
		const scheduleData = ref<ScheduleDataItem[]>([
			{
				dayOfWeek: 1,
				timeStart: '11:00',
				timeEnd: '12:15',
			},
			{
				dayOfWeek: 1,
				timeStart: '13:30',
				timeEnd: '14:10',
			},
			{
				dayOfWeek: 3,
				timeStart: '11:50',
				timeEnd: '12:55',
			},
			{
				dayOfWeek: 3,
				timeStart: '16:30',
				timeEnd: '18:10',
			},
		])
		const handlerSelectCell = (day: number, timeSlot: number) => {
			console.log(`Выбрал ячейку ${day}:${timeSlot}`)
		}

		const handlerSelectRow = (day: number) => {
			console.log(`Выбрал строку ${day}`)
		}

		const handlerSelectCol = (timeSlot: number) => {
			console.log(`Выбрал колонку ${timeSlot}`)
		}

		const handlerSelectTimeline = (day: number, timeline: [string, string]) => {
			console.log(`Выбрал интервал ${timeline} на день ${day}`)
		}

		return () => (
			<div class="text-sm p-4 text-slate-500">
				{/* <div class="grid-test">
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>1</div>
					<div>2</div>
					<div>3</div>
				</div> */}
				<CSchedule
					onSelectCell={handlerSelectCell}
					onSelectRow={handlerSelectRow}
					onSelectCol={handlerSelectCol}
					onSelectTimeline={handlerSelectTimeline}
					data={scheduleData.value}
					showCellBorder
				>
					{
						{
							// cell: ({ day, time }: CellSLot) => (
							// 	<div class="group w-full text-sx">
							// 		<p class="text-slate-600 dark:text-slate-400">День {day}</p>
							// 		<p class="text-slate-900 dark:text-slate-400">Время {time}</p>
							// 	</div>
							// ),
							// 'time-11:00': (a: unknown, b: unknown) => `День ${a}, время ${b}`,
							// 'time-14:00': (a: unknown, b: unknown) => `День ${a}, время ${b}`,
						}
					}
				</CSchedule>
				{/* <button class="py-1.5 px-4 rounded-full bg-slate-950 text-white  hover:bg-slate-700 box-border active:opacity-80 transition-opacity duration-150">
					<span class="relative bottom-2px" onClick={openModal}>
						Открыть модалку {isOpen.value}
					</span>
				</button> */}
			</div>
		)
	},
})
