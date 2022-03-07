import { stat, readdir, readFile} from "fs/promises";
import { join } from "path";
import { get, reset, set } from "stamptime";

get("qwerty");