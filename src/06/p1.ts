import * as fs from 'fs'
import path from 'path'

const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

const STATS: { count: number; lastFour: string[] } = {
  count: 0,
  lastFour: [],
}

const findPacket = (code: string) => {
  for (const str of code) {
    switch (STATS.lastFour.length) {
      case 0:
        STATS.lastFour.push(str)
        STATS.count += 1
        break
      case 1:
      case 2:
      case 3:
        if (!STATS.lastFour.includes(str)) {
          STATS.lastFour.push(str)
          STATS.count += 1
        } else {
          // splice first duplicate and anything prior
          const target = STATS.lastFour.indexOf(str)
          STATS.lastFour.splice(0, target + 1)
          STATS.lastFour.push(str)
          STATS.count += 1
        }
        break
      case 4:
        // solved
        return STATS
      default:
        console.log('in default', STATS)
        break
    }
  }
}

findPacket(data)
