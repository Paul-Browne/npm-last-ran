const stamptime = require(".");

const start = Date.now();

let i = 1000;
while(i--){
	stamptime.set(i);
	stamptime.get(i);
	stamptime.reset(i);
}

console.log(Date.now() - start);