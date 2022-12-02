import * as fs from 'fs'
import path from 'path'
const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

const CONVERSION = {
	A: 'ROCK',
	B: 'PAPER',
	C: 'SCISSORS',
	X: 'ROCK',
	Y: 'PAPER',
	Z: 'SCISSORS',
}

const SIGN_VALUE = {
	ROCK: 1,
	PAPER: 2,
	SCISSORS: 3,
} as const

const RESULT_VALUE = {
	WIN: 6,
	DRAW: 3,
	LOSS: 0,
} as const

const { WIN, DRAW, LOSS } = RESULT_VALUE
const RESULT_TABLE = {
	ROCK: {
		ROCK: DRAW,
		PAPER: LOSS,
		SCISSORS: WIN,
	},
	PAPER: {
		ROCK: WIN,
		PAPER: DRAW,
		SCISSORS: LOSS,
	},
	SCISSORS: {
		ROCK: LOSS,
		PAPER: WIN,
		SCISSORS: DRAW,
	},
} as const

const calculateScore = (opponentCode: string, yourCode: string) => {
	const yourSign = CONVERSION[yourCode as keyof typeof CONVERSION]
	const opponentSign = CONVERSION[opponentCode as keyof typeof CONVERSION]

	const result = yourSign
		? SIGN_VALUE[yourSign as keyof typeof SIGN_VALUE] +
		  RESULT_TABLE[yourSign as keyof typeof SIGN_VALUE][
				opponentSign as keyof typeof SIGN_VALUE
		  ]
		: 0
	return result
}

const splitByLine = data.split('\n')
const splitByRound = splitByLine.map((x) => x.split(' '))

let overallScore = 0

for (const round of splitByRound) {
	overallScore += calculateScore(round[0], round[1])
}

console.log('FINAL', overallScore)
