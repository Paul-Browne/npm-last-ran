# stamptime
get and set a timestamp of when a script/function was last executed.

### usage

`npm i stamptime`

or 

`npm i -D stamptime`


```js
const stamp = require("stamptime");

stamp.set();        // sets the timestamp
stamp.set(123)      // sets a timestamp with an id of 123

/* Bunch of code... */

stamp.get()         // gets the time stamp
stamp.get()         // gets the time stamp with an id of 123

/* Bunch of code... */

stamp.reset()           // resets the time stamp
stamp.reset(123)        // resets the time stamp with an id of 123
```

Useful for build process, eg. only build/compile if a file has changed since last build

```js
const fs = require("fs");
const path = require("path");
const stamp = require("stamptime");

const timestamp = stamp.get(1);

const changedFilesSinceLastBuild = (_path, callback) => {
    const stats = fs.statSync(_path);
    if (stats.isDirectory()) {
        fs.readdirSync(_path).map(subFileOrDirectory => {
            return changedFilesSinceLastBuild(path.join(_path, subFileOrDirectory), callback);
        })
    } else if(stats.mtimeMs > timestamp || stats.ctimeMs > timestamp){
        callback(fs.readFileSync(_path))
    }
}

stamp.set(1);

changedFilesSinceLastBuild("src", buffer => {
    // do something to just the files that have changed 
    // since the last time this script was ran
});
```

### How does it work?

stamptime uses file creation/modification time as a timestamp. eg. `stamp.set(1234)` will create an empty file named "1234" in the node_modules/stampfile/ directory. Then `stamp.get(1234)` uses `fs.statSync()` to return the time the file was created (or modified if it already existed).

This works very quickly since the file system doesn't need to read the file using `fs.readFileSync` rather just the `mtimeMs` (last modified time) from the `fs.statSync` method.




