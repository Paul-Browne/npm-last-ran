const fs = require("fs");
const path = require("path");

const _path = id => path.join(__dirname, "_" + (id||0).toString());

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