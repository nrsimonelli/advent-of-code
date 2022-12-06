import * as fs from 'fs'
import path from 'path'

const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

const splitByLine = data.split('\n').filter((item, index) => index > 9 && item)

type CRATES = keyof typeof CRATES
const CRATES = {
  '1': ['D', 'T', 'R', 'B', 'J', 'L', 'W', 'G'],
  '2': ['S', 'W', 'C'],
  '3': ['R', 'Z', 'T', 'M'],
  '4': ['D', 'T', 'C', 'H', 'S', 'P', 'V'],
  '5': ['G', 'P', 'T', 'L', 'D', 'Z'],
  '6': ['F', 'B', 'R', 'Z', 'J', 'Q', 'C', 'D'],
  '7': ['S', 'B', 'D', 'J', 'M', 'F', 'T', 'R'],
  '8': ['L', 'H', 'R', 'B', 'T', 'V', 'M'],
  '9': ['Q', 'P', 'D', 'S', 'V'],
}

const result: string[] = []

const moveCrates = (array: string[]) => {
  for (const line of array) {
    const x = line.match(/^\d+|\d+\b|\d+(?=\w)/g)
    if (x) {
      const [move, from, to] = x
      const groupedMove: string[] = []

      for (let i = 0; i < Number(move); i++) {
        groupedMove.push(CRATES[from as CRATES].pop() ?? 'ERROR')
      }

      for (const line of groupedMove.reverse()) {
        CRATES[to as CRATES].push(line)
      }
    }
  }

  for (const box of Object.values(CRATES)) {
    const topCrate = box.pop()

    if (topCrate) {
      result.push(topCrate)
    }
  }

  return result
}

moveCrates(splitByLine)
