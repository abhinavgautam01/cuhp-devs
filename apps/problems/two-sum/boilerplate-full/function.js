## USER_CODE_HERE ##

const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

const a = Number(input[0]);
const b = Number(input[1]);

const result = twoSum(a, b);
console.log(result);
