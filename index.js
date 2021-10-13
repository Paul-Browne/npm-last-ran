import { access, stat, writeFile, unlink } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';

const path = id => {
	const e = new Error();
	// do match first
	const matched = e.stack.match(/node_modules\/.*?\//g);
	// get unique matches (no need to check if it returned any, since it will always return at least one)
	const unique = matched.filter((el,i,arr) => arr.indexOf(el) === i);
	// filter out "stamptime" (since all will have this) and replace "node_modules/" and trailing "/"
	const reduced = unique.reduce((acc, el) => {
    	const name = el.match(/node_modules\/(.*?)\//);
    	return (name[1] !== "stamptime" ) ? (acc + "_" + name[1]) : acc;
	}, (id||0).toString() );
	return join(dirname(fileURLToPath(import.meta.url)), reduced );
}

export const get = async id => {
	return await access(path(id)) ? stat(path(id)).mtimeMs : 0;
}
export const set = async id => {
	await writeFile(path(id), "");
}
export const reset = async id => {
	await access(path(id)) && unlink(path(id), () => { });
}