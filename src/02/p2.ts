import * as fs from 'fs'
import path from 'path'
const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

const CONVERSION = {
	A: 'ROCK',
	B: 'PAPER',
	C: 'SCISSORS',
	X: 'LOSS',
	Y: 'DRAW',
	Z: 'WIN',
}

const SIGN_VALUE = {
	ROCK: 1,
	PAPER: 2,
	SCISSORS: 3,
} as const

const RESULT_VALUE = {
	LOSS: 0,
	DRAW: 3,
	WIN: 6,
} as const

const RESULT_TABLE = {
	ROCK: {
		LOSS: 'SCISSORS',
		DRAW: 'ROCK',
		WIN: 'PAPER',
	},
	PAPER: {
		LOSS: 'ROCK',
		DRAW: 'PAPER',
		WIN: 'SCISSORS',
	},
	SCISSORS: {
		LOSS: 'PAPER',
		DRAW: 'SCISSORS',
		WIN: 'ROCK',
	},
} as const

const calculateScore = (opponentCode: string, yourCode: string) => {
	const yourSign = CONVERSION[yourCode as keyof typeof CONVERSION]
	const opponentSign = CONVERSION[opponentCode as keyof typeof CONVERSION]

	const pointsFromResult = yourSign
		? RESULT_VALUE[yourSign as keyof typeof RESULT_VALUE]
		: 0
	const pointsFromSign = yourSign
		? SIGN_VALUE[
				RESULT_TABLE[opponentSign as keyof typeof RESULT_TABLE][
					yourSign as keyof typeof RESULT_VALUE
				] as keyof typeof SIGN_VALUE
		  ]
		: 0

	return pointsFromResult + pointsFromSign
}

const splitByLine = data.split('\n')
const splitByRound = splitByLine.map((x) => x.split(' '))

let overallScore = 0

for (const round of splitByRound) {
	overallScore += calculateScore(round[0], round[1])
}

console.log('FINAL', overallScore)
