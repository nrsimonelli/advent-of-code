import * as fs from 'fs'
import path from 'path'
const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

const splitByElf = data.split('\n\n').map((elf) => elf.split('\n'))

const runningStats = {
	elfWithTheMostCalories: 0,
	calories: 0,
	ties: [0],
}

let i = 1

for (const elf of splitByElf) {
	const stringToNumber = elf.map((str) => Number(str))
	const sumOfCaloriesByElf = stringToNumber.reduce((a, b) => a + b)
	console.log(i, sumOfCaloriesByElf)

	if (sumOfCaloriesByElf === runningStats.elfWithTheMostCalories) {
		runningStats.ties.push(i)
	} else if (sumOfCaloriesByElf > runningStats.calories) {
		runningStats.elfWithTheMostCalories = i
		runningStats.calories = sumOfCaloriesByElf
		runningStats.ties = [i]
	}
	i += 1
}

console.log(runningStats)
