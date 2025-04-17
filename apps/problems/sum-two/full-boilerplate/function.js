// ##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split(/\s+/).map(Number).slice(1);
const result = sumTwo(input);
console.log(result);