// ##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
const param0 = input.shift();
const result = sumTwo(param0);
console.log(result);