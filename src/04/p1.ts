import * as fs from 'fs'
import path from 'path'

const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

const splitByLine = data.split('\n').filter((n) => n)

const transformedData = splitByLine.map((line) => {
	const end = line.split('-')
	const middle = end[1].split(',')

	return {
		e1Start: Number(end[0]),
		e1End: Number(middle[0]),
		e2Start: Number(middle[1]),
		e2End: Number(end[2]),
	}
})

const countOverlappingRanges = (line: {
	e1Start: number
	e1End: number
	e2Start: number
	e2End: number
}) => {
	const { e1Start, e1End, e2Start, e2End } = line
	// we need to find all the ranges conatined within their pair group
	if (e1Start === e2Start) {
		return 1
	}
	if (e1End === e2End) {
		return 1
	}
	if (e1Start > e2Start && e1End < e2End) {
		return 1
	}
	if (e1Start < e2Start && e1End > e2End) {
		return 1
	}
	return 0
}

let count = 0
for (const entry of transformedData) {
	count += countOverlappingRanges(entry)
}

console.log(count)
