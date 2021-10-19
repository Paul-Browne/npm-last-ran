# stamptime
get and set a timestamp of when a script/function was last executed.

### usage

`npm i stamptime`

or 

`npm i -D stamptime`


```js
import { get, set, reset } from "stamptime"

set();        // sets the timestamp
set(123);      // sets a timestamp with an id of 123

/* Bunch of code... */

const time = await get();         // gets the time stamp
const time = await get("foo");    // gets the time stamp with an id of "foo"

/* Bunch of code... */

reset()           // resets the time stamp
reset(123)        // resets the time stamp with an id of 123
```

if doing `get(id)` before `set(id)` the result will be 0, and a `set(id)` call will be made.

### How does it work?

stamptime uses file creation/modification time as a time eg. `set(1234)` will create an empty file named "1234" in the node_modules/stampfile/ directory. Then `get(1234)` uses `stat` to return the time the file was created (or modified if it already existed).

This works very quickly since the file system doesn't need to read the file using `readFile` rather just the `mtimeMs` (last modified time) from the `stat` method.




