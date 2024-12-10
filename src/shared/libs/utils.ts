export const range = (to: number, startAt = 0): number[] =>
	Array.from(Array(to)).reduce((r, v, i) => {
		if (i >= startAt) r.push(i === startAt ? startAt : i + 1)
		return r
	}, [] as number[])
