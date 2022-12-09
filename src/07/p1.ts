import * as fs from 'fs'
import path from 'path'

const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')
const splitByLine = data.split(/\r?\n/)

const isChangeDirectory = (line: string) => {
  return line.startsWith('$ cd') ? true : false
}

const isChangeDirectoryForward = (line: string) => {
  return isChangeDirectory(line) && !line.includes('..') ? true : false
}

const isChangeDirectoryBackward = (line: string) => {
  return isChangeDirectory(line) && line.includes('..') ? true : false
}

const getDirectoryName = (line: string) => {
  return line.split(' ').at(-1) ?? ''
}

const isFile = (line: string) => {
  if (!isNaN(parseInt(line?.split(' ')?.at(0) ?? ''))) {
    return true
  }
  return false
}

const getFileValue = (line: string) => {
  return parseInt(line?.split(' ').at(0) ?? '')
}

let sum = 0
let cwd: string[] = []
let result = new Map<string, number>()

for (const line of splitByLine) {
  if (isChangeDirectory(line)) {
    if (isChangeDirectoryForward(line)) {
      cwd.push(getDirectoryName(line))
      result.set(cwd.join(''), 0)
    }
    if (isChangeDirectoryBackward(line)) {
      cwd.pop()
    }
  }

  if (isFile(line)) {
    const tempCwd = [...cwd]
    tempCwd.push('')

    for (let j = 0; j < cwd.length; j++) {
      tempCwd.pop()

      const path = tempCwd.join('')
      const previousValue = result.get(path) ?? 0

      result.set(path, previousValue + getFileValue(line))
    }
  }
}

const LIMIT = 100000

result.forEach((value) => {
  if (value <= LIMIT) {
    sum += value
  }
})

console.log(sum)
