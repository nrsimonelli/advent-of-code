import * as fs from 'fs'
import path from 'path'
const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

// no empty line at the end this time
const splitByLine = data.split('\n').filter((n) => n)

// split into "compartments", all lines happen to be even so this is ok
const splitIntoCompartments = splitByLine.map((line) => {
	const half = line.length / 2
	return [line.slice(0, half), line.slice(half, line.length)]
})

const matchingItems: string[] = []

const findMatch = (compartment1: string, compartment2: string) => {
	const checkCompartment = [...compartment2]
	for (const item of compartment1) {
		if (checkCompartment.includes(item)) {
			return item
		}
	}
	// there will always be a match but want to keep the return type as string
	return ''
}

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

for (const compartment of splitIntoCompartments) {
	matchingItems.push(findMatch(compartment[0], compartment[1]))
}

sumItemPriority(matchingItems)
