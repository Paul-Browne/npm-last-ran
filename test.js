import { stat, readdir, readFile, access } from "fs/promises";
import { join } from "path";
import { set, get, reset } from "stamptime";

const start = Date.now();

let i = 100;

while(i--){
	await set(i);
	await get(i);
	await reset(i);
}

console.log(Date.now() - start);

const changedFilesSinceLastBuild = async path => {
	const timestamp = await get("xyz");
    const stats = await stat(path);
    if (stats.isDirectory()) {
        const directoryContents = await readdir(path);
        return Promise.all(directoryContents.map(subFileOrDirectory => changedFilesSinceLastBuild(join(path, subFileOrDirectory))))
    } else if(stats.mtimeMs > timestamp || stats.ctimeMs > timestamp){
        return {
			data: await readFile(path),
			path
		}
    }
}

// set just once
//set("xyz");


const filesWithChangesContents = await changedFilesSinceLastBuild("test");
console.log(filesWithChangesContents);