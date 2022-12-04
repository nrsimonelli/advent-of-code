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
	// this time we need to find any overlap at all
	if (e1End < e2Start) {
		return 0
	}
	if (e2End < e1Start) {
		return 0
	}
	if (e1Start <= e2Start && e2Start <= e1End) {
		return 1
	}
	if (e2Start <= e1Start && e1Start <= e2End) {
		return 1
	}
	return 0
}

let count = 0
for (const entry of transformedData) {
	count += countOverlappingRanges(entry)
}

console.log(count)
