import * as fs from 'fs'
import path from 'path'
const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

// no empty line at the end this time
const splitByLine = data.split('\n').filter((n) => n)

const groupedByThree: string[][] = []

// split the 300 lines into groups of 3
for (let i = 0; i < splitByLine.length / 3; i++) {
	const res = splitByLine.slice(i * 3, i * 3 + 3)
	groupedByThree.push(res)
}

const matchingItems: string[] = []

const findMatch = (line1: string, line2: string, line3: string) => {
	const checkLine2 = [...line2]
	const checkLine3 = [...line3]

	for (const item of line1) {
		if (checkLine2.includes(item) && checkLine3.includes(item)) {
			return item
		}
	}
	// there will always be one match but want to keep the return type as string
	return ''
}

// same priority rankings
const sumItemPriority = (items: string[]) => {
	let sum = 0
	for (const item of items) {
		if (item === item.toLowerCase()) {
			// base 36 minus 9 so that "a" = 1
			sum += parseInt(item, 36) - 9
		} else {
			// base 36 plus 17 so that "A" = 27
			sum += parseInt(item, 36) + 17
		}
	}

	return sum
}

for (const group of groupedByThree) {
	matchingItems.push(findMatch(group[0], group[1], group[2]))
}

sumItemPriority(matchingItems)
