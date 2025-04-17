// ##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/stdin', 'utf8')
  .trim()
  .split(/\s+/)
  .map(Number);

const count = input.shift();   
const numbers = input.slice(0, count); 

const result = multiplyNumbers(numbers);
console.log(result);