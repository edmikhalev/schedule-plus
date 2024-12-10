<template>
	<div class="schedule">
		<div class="flex flex-col box-border bg-gray-800">
			<ScheduleRow
				:key="dayOfWeekIndex"
				v-for="(dayOfWeek, dayOfWeekIndex) of formatedDaysOfWeek"
			>
				<ScheduleCell
					:width="40"
					:height="cellHeight"
					class="select-none flex justify-center items-center border-r schedule-border"
				>
					{{ dayOfWeek }}
				</ScheduleCell>
			</ScheduleRow>
			<ScheduleRow>
				<ScheduleCell
					:width="40"
					:height="20"
					class="select-none flex justify-center items-center border-r schedule-border"
				/>
			</ScheduleRow>
		</div>
		<div class="schedule__scroll-container flex overflow-x-auto">
			<div class="schedule-viewport flex flex-col flex-shrink-1 box-border relative">
				<ScheduleRow v-for="(_, idx) of formatedDaysOfWeek" :key="idx">
					<ScheduleCell
						v-for="timeSlot of timeSlots"
						:key="timeSlot"
						:width="cellWidth"
						:height="cellHeight"
						class="group [&:not(:last-child)]:border-r schedule-border dark:bg-gray-700 flex justify-center items-center select-none cursor-pointer"
						@select="handlerSelect(idx, timeSlot)"
					>
						<div class="group-hover:block hidden text-2xl">+</div>
					</ScheduleCell>
					<div
						class="min-h-3 min-w-3 text-gray-100 absolute shadow-lg select-none border-2 border-t-0 border-b-0 box-border border-white border-r-white"
						:style="calcStyles(time, timeIdx)"
						:key="time.join()"
						v-for="(time, timeIdx) of scheduleData[idx]"
					>
						<div
							class="px-2 flex h-full w-full bg-opacity-10 hover:bg-opacity-30 bg-white hover:bg-lime-500"
						>
							{{ time.join(' -> ') }}
						</div>
					</div>
					<!-- time layer -->
				</ScheduleRow>
				<ScheduleRow>
					<ScheduleCell
						v-for="timeSlot of timeSlots"
						:key="timeSlot"
						:width="cellWidth"
						:height="20"
						class="[&:not(:last-child)]:border-r schedule-border flex select-none bg-gray-800"
					>
						{{ timeSlot }}
					</ScheduleCell>
				</ScheduleRow>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { DAYS_OF_WEEK } from '@/entities/Schedule'
import ScheduleCell from './ScheduleCell.vue'
import ScheduleRow from './ScheduleRow.vue'
import './styles.css'

import { ref } from 'vue'

// interface ScheduleItem {
// 	timeStart: string[]
// 	timeEnd: string[]
// }

const TIME_DELIMETR = ':'
const MINUTES_IN_HOUR = 60

function timeToDecimal(time: string): number {
	const [h, m] = time.split(TIME_DELIMETR).map((i) => parseInt(i))
	return (h * MINUTES_IN_HOUR + m) / MINUTES_IN_HOUR
}

// function generateScheduleForDay(day: number) {
// 	const timeOfDay = scheduleData[day]
// }

// const getTime = (time: string): number => timeToDecimal(time)

// const scheduleData: Record<number, ScheduleItem> = {
// 	0: {
// 		timeStart: [],
// 		timeEnd: [],
// 	},
// 	1: {
// 		timeStart: [],
// 		timeEnd: [],
// 	},
// 	2: {
// 		timeStart: ['08:15', '8:45', '13:20', '15:00'],
// 		timeEnd: ['09:15', '10:55', '14:30', '16:40'],
// 	},
// 	3: {
// 		timeStart: [],
// 		timeEnd: [],
// 	},
// 	4: {
// 		timeStart: [],
// 		timeEnd: [],
// 	},
// 	5: {
// 		timeStart: [],
// 		timeEnd: [],
// 	},
// 	6: {
// 		timeStart: [],
// 		timeEnd: [],
// 	},
// }
const scheduleData: Record<number, [string, string][]> = {
	0: [['07:45', '8:25']],
	1: [],
	2: [
		['08:15', '8:55'],
		['10:05', '11:25'],
	],
	3: [
		['08:10', '12:55'],
		['10:05', '11:25'],
	],
	4: [
		['18:15', '19:05'],
		['13:30', '14:15'],
	],
	5: [],
	6: [['21:30', '21:45']],
}

// interface DayData {
// 	startTime: number[]
// 	endTime: number[]
// }
// const timeIsBetween = (time: number, start: number, end: number): boolean =>
// 	time >= start && time <= end

// const getTimeInRange = (slotTime: string, timeRange: string[]): number[] => {
// 	const cellTimeStart = getTime(slotTime)
// 	const cellTimeEnd = cellTimeStart + 1

// 	return timeRange.reduce((result, currentTime) => {
// 		const time = getTime(currentTime)

// 		if (timeIsBetween(time, cellTimeStart, cellTimeEnd)) {
// 			console.warn('is between ', time, cellTimeStart, cellTimeEnd)
// 			result.push(time)
// 		}
// 		return result
// 	}, [] as number[])
// }

// const getScheduleData = (day: number, timeSlot: string) => {
// 	const data = scheduleData[day]
// 	const result: { startTime: number[]; endTime: number[] } = {
// 		startTime: [],
// 		endTime: [],
// 	}

// 	if (data) {
// 		result.startTime = getTimeInRange(timeSlot, data.timeStart)
// 		result.endTime = getTimeInRange(timeSlot, data.timeEnd)
// 	}

// 	return result
// }
// const getScheduleData = (day: number, time: string) => {
// 	const item = scheduleData[day]
// 	if (!item) {
// 		return false
// 	}
// 	const ts = convertTime(scheduleData[day].timeStart)
// 	const te = convertTime(scheduleData[day].timeEnd)
// 	const ct = convertTime(time)
// 	return ct >= ts && ct <= te
// }

const timeSlots = ref([
	'06:00',
	'07:00',
	'08:00',
	'09:00',
	'10:00',
	'11:00',
	'12:00',
	'13:00',
	'14:00',
	'15:00',
	'16:00',
	'17:00',
	'18:00',
	'19:00',
	'20:00',
	'21:00',
	'22:00',
	'23:00',
])

const formatedDaysOfWeek = DAYS_OF_WEEK.map(
	(dayOfWeek) => dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
)

const cellWidth = ref(200)
const cellHeight = ref(120)

const handlerSelect = (dayOfWeek: number, timeSlot: string) => {
	console.log('on select ', dayOfWeek, timeSlot)
}

// const getDayEvents = (day: number): DayData => {
// 	const data = scheduleData[day]
// 	const result: { startTime: number[]; endTime: number[] } = {
// 		startTime: [],
// 		endTime: [],
// 	}

// 	if (data) {
// 		result.startTime = getTimeInRange(timeSlot, data.timeStart)
// 		result.endTime = getTimeInRange(timeSlot, data.timeEnd)
// 	}

// 	return result
// }

const calcStyles = ([start, end]: [string, string], index: number) => {
	const ts = timeToDecimal(start)
	const te = timeToDecimal(end)
	const minTime = timeToDecimal(timeSlots.value[0])
	const percent = 100 / timeSlots.value.length

	const left = percent * (ts - minTime)
	const width = percent * (te - minTime) - left
	return {
		left: `${left}%`,
		width: `${width}%`,
		top: `${index === 0 ? 5 : index * 20 + 5}px`,
	}
}
// const calculateTimeStartStyles = (time: string): TimeData => {
// 	const ct = (convertTime(time) / 100) * convertTime(time) * 100
// 	console.log(ct)
// 	return {
// 		left: `${ct}%`,
// 	}
// }

// const calculateTimeEndStyles = (time: string): TimeData => {
// 	const ct = convertTime(time)
// 	console.log(ct)
// 	return {}
// }
</script>
