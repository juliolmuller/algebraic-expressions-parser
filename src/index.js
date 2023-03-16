import { resolve } from './algorithm.js';

/* Expected args format: "var1=50 var2=100 ..." */
const [,, input = '0', ...args] = process.argv
const timeStart = Date.now()
const parsedArgs = Object.fromEntries(args.map(arg => arg.split('=')))
const output = resolve(input, parsedArgs)
const timeEnd = Date.now()

console.log(output)
console.log(`${timeEnd - timeStart}ms`)
