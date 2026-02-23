## USER_CODE_HERE ##

const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/);

const s = Number(input[0]);

const result = isValid(s);
console.log(result);
