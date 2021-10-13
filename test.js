import { set, get, reset } from "stamptime";

const start = Date.now();

let i = 10000;

while(i--){
	await set(i);
	await get(i);
	await reset(i);
}

console.log(Date.now() - start);