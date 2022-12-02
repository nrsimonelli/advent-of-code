import * as fs from 'fs'
import path from 'path'

const data = fs.readFileSync(path.resolve(__dirname, './index.txt'), 'utf-8')

console.log(data)
