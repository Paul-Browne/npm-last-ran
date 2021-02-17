const fs = require("fs");
const path = require("path");

const _path = id => {
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
	return path.join(__dirname, reduced );
}

module.exports = {
	get: id => {
		return fs.existsSync(_path(id)) ? fs.statSync(_path(id)).mtimeMs : 0;
	},
	set: id => {
		fs.writeFileSync(_path(id), "");
	},
	reset: id => {
		fs.existsSync(_path(id)) && fs.unlink(_path(id), () => {});
	}
}