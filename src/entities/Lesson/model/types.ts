export interface ILesson {
	id: string
	date: Date
	timeStart: string
	timeEnd: string
	description: string
	syllabusId: string
	tariff: number
	discount: number
	createdAt: Date
	updatedAt: Date
}
