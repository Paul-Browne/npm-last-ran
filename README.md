# stamptime
get and set a timestamp of when a script/function was last executed.

### usage

`npm i stamptime`

or 

`npm i -D stamptime`


```js
import { get, set, reset } from "stamptime"

// sets a timestamp with an id of "evt8ex"
set("evt8ex");

// gets the time stamp with an id of "evt8ex"
const time = await get("evt8ex");

// resets the time stamp with an id of "evt8ex"
reset("evt8ex");
```

if doing `get(id)` before `set(id)` the result will be 0, and a `set(id)` call will be made.

### How does it work?

stamptime uses file creation/modification time as a time eg. `set("evt8ex")` will create an empty file named "evt8ex" in the node_modules/stampfile/ directory. Then `get("evt8ex")` uses `stat` to return the time the file was created (or modified if it already existed).

This works very quickly since the file system doesn't need to read the file using `readFile` rather just the `mtimeMs` (last modified time) from the `stat` method.