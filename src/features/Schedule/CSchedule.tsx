import { computed, defineComponent, type PropType } from 'vue'
import './styles.css'
import { range } from '@/shared/libs'
import type { CellSLot, ScheduleDataItem } from './types'
const TIME_DELIMETR = ':'
const MINUTES_IN_HOUR = 60

function timeToDecimal(time: string): number {
	const [h, m] = time.split(TIME_DELIMETR).map((i) => parseInt(i))
	return (h * MINUTES_IN_HOUR + m) / MINUTES_IN_HOUR
}

const CScheduleTimeline = defineComponent({
	name: 'CScheduleTimeline',
	props: {
		startFrom: {
			type: String,
			required: true,
		},
		hours: {
			type: Number,
			required: true,
		},
		timeline: {
			type: Array as unknown as PropType<ScheduleTimeline>,
			default() {
				return []
			},
		},
	},
	emits: ['click'],
	setup(props, { slots, emit }) {
		const style = computed(() => {
			const ts = timeToDecimal(props.timeline[0])
			const te = timeToDecimal(props.timeline[1])
			const minTime = timeToDecimal(props.startFrom)
			const percent = 100 / props.hours

			console.log(props.hours)

			const left = percent * (ts - minTime)
			const width = percent * (te - minTime) - left
			return {
				left: `${left}%`,
				width: `${width}%`,
			}
		})

		return () => (
			<div
				class={`px-2 select-none rounded active:bg-blue-600/90 text-sm box-border absolute shadow z-10 top-52 h-6 min-w-4 bg-blue-600/50 text-slate-50 dark:text-blue-50`}
				style={style.value}
				onClick={() => emit('click')}
				aria-label={props.timeline.join(' - ')}
			>
				<div class="absolute whitespace-nowrap overflow-hidden ">{props.timeline.join(' - ')}</div>
				{slots.default?.()}
			</div>
		)
	},
})

const CScheduleRow = defineComponent({
	name: 'CScheduleRow',
	props: {
		noBorder: Boolean,
	},
	emits: ['click'],
	setup(props, { slots, emit }) {
		return () => (
			<div
				class={`relative h-16 box-border border-b border-gray-200 dark:border-gray-700 flex flex-grow w-full ${props.noBorder ? 'border-none' : ''}`}
				onClick={() => emit('click')}
			>
				{slots.default?.()}
			</div>
		)
	},
})

const CScheduleCell = defineComponent({
	name: 'CScheduleCell',
	props: {
		showBorder: Boolean,
	},
	emits: ['click'],
	setup(props, { slots, emit }) {
		const borderStyles = computed(() => {
			if (props.showBorder) {
				return '[&:not(:last-child)]:border-r border-gray-200 dark:border-slate-700 border-dotted'
			}
			return ''
		})

		return () => (
			<div
				class={`p-2 box-border overflow-hidden flex flex-grow ${borderStyles.value}`}
				style="min-width: 80px"
				onClick={() => emit('click')}
			>
				{slots.default?.()}
			</div>
		)
	},
})

type ScheduleTimeline = [string, string]

interface ScheduleDataNormalized {
	[key: number]: ScheduleTimeline[]
}

export default defineComponent({
	name: 'CSchedule',
	emits: ['selectRow', 'selectCell', 'selectCol', 'selectTimeline'],
	props: {
		showCellBorder: Boolean,
		data: {
			type: Array as PropType<ScheduleDataItem[]>,
			required: true,
		},
	},
	setup(props, { emit, slots }) {
		const schedule = computed<ScheduleDataNormalized>(() => {
			return props.data.reduce((result, { dayOfWeek, timeStart, timeEnd }) => {
				if (!result[dayOfWeek]) {
					result[dayOfWeek] = [[timeStart, timeEnd]]
					return result
				}

				result[dayOfWeek].push([timeStart, timeEnd])
				return result
			}, {} as ScheduleDataNormalized)
		})

		const daysOfWeek = 'пн вт ср чт пт сб вс'.split(' ').map((a) => a.charAt(0).toUpperCase() + a.slice(1))
		const timeSlots = range(23, 6).map((i) => String(i).padStart(2, '0') + ':00') // Это время можно получить из настроек (то есть)

		const handlerSelectCell = (day: number, timeSlot: number) => {
			emit('selectCell', day, timeSlot)
		}

		const onSelectTimeline = (day: number, timeline: ScheduleTimeline) => {
			emit('selectTimeline', day, timeline)
		}

		const handlerSelectRow = (day: number) => {
			emit('selectRow', day)
		}

		const handlerSelectCol = (timeSlot: number) => {
			emit('selectCol', timeSlot)
		}

		const getTimelines = (idx: number): ScheduleTimeline[] => {
			return schedule.value[idx] || []
		}

		console.log(schedule.value)

		return () => (
			<div class="c-schedule p-2 shadow text-slate-500 dark:text-slate-100 border dark:border-slate-950">
				{slots.header?.()}
				<div class="c-schedule-wrapper flex flex-row flex-nowrap">
					<div class="c-schedule-v">
						{daysOfWeek.map((v, i) => {
							return (
								<CScheduleRow>
									<CScheduleCell style="minWidth: 40px" onClick={() => handlerSelectRow(i)}>
										{v}
									</CScheduleCell>
								</CScheduleRow>
							)
						})}
					</div>
					<div class="s-chedule-scroll-container w-full overflow-auto">
						<div class="s-chedule-body flex flex-col min-w-min flex-grow w-full">
							{daysOfWeek.map((day, dayIndex) => {
								return (
									<CScheduleRow>
										<>
											{getTimelines(dayIndex).map((timeline) => (
												<CScheduleTimeline
													startFrom={timeSlots[0]}
													hours={timeSlots.length}
													timeline={timeline}
													onClick={() => onSelectTimeline(dayIndex, timeline)}
												/>
											))}
											{timeSlots.map((ts, tsIdx) => (
												<CScheduleCell
													showBorder={props.showCellBorder}
													onClick={() => handlerSelectCell(dayIndex, tsIdx)}
												>
													{slots.cell?.({
														day: dayIndex,
														dayName: day,
														time: ts,
														timeIndex: tsIdx,
													} as CellSLot)}
												</CScheduleCell>
											))}
										</>
									</CScheduleRow>
								)
							})}
							<CScheduleRow noBorder>
								{timeSlots.map((time, i) => (
									<CScheduleCell onClick={() => handlerSelectCol(i)}>{time}</CScheduleCell>
								))}
							</CScheduleRow>
						</div>
					</div>
				</div>
			</div>
		)
	},
})
