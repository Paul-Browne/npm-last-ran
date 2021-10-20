import { stat, writeFile, unlink } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';

const path = id => {
	const valid = (typeof id === 'string' && id.length > 5);
	if(valid){
		return join(dirname(fileURLToPath(import.meta.url)), id );
	}else{
		console.error("id must be a string of at least 6 characters");
	}
}

export const get = async id => {
	try {
		return (await stat(path(id))).mtimeMs;
	} catch (error) {
		await writeFile(path(id), "");
		return 0;
	}
}
export const set = async id => {
	await writeFile(path(id), "");
}
export const reset = async id => {
	try {
		await unlink(path(id), () => { });
	} catch  { }
}