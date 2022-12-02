import * as fs from 'fs'
import path from 'path'
const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

const splitByElf = data.split('\n\n').map((elf) => elf.split('\n'))

const runningStats = {
	first: 0,
	second: 0,
	third: 0,
}

for (const elf of splitByElf) {
	const stringToNumber = elf.map((str) => Number(str))
	const sumOfCaloriesByElf = stringToNumber.reduce((a, b) => a + b)

	if (runningStats.first < sumOfCaloriesByElf) {
		runningStats.third = runningStats.second
		runningStats.second = runningStats.first
		runningStats.first = sumOfCaloriesByElf
	} else if (runningStats.second < sumOfCaloriesByElf) {
		runningStats.third = runningStats.second
		runningStats.second = sumOfCaloriesByElf
	} else if (runningStats.third < sumOfCaloriesByElf) {
		runningStats.third = sumOfCaloriesByElf
	}
}

console.log(Object.values(runningStats).reduce((a, b) => a + b))
