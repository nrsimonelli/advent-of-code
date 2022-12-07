import * as fs from 'fs'
import path from 'path'

const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

const STATS: { count: number; lastFourteen: string[] } = {
  count: 0,
  lastFourteen: [],
}

const findPacket = (code: string) => {
  for (const str of code) {
    // same as puzzle 1 but 14 unique instead of 4...
    switch (STATS.lastFourteen.length) {
      case 0:
        STATS.lastFourteen.push(str)
        STATS.count += 1
        break
      case 1:
      case 2:
      case 3:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
        if (!STATS.lastFourteen.includes(str)) {
          STATS.lastFourteen.push(str)
          STATS.count += 1
        } else {
          // splice first duplicate and anything prior
          const target = STATS.lastFourteen.indexOf(str)
          STATS.lastFourteen.splice(0, target + 1)
          STATS.lastFourteen.push(str)
          STATS.count += 1
        }
        break
      case 14:
        // solved
        return STATS
      default:
        console.log('in default', STATS)
        break
    }
  }
}

findPacket(data)
