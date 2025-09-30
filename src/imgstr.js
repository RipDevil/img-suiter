#!/usr/bin/env node
import { main } from "./main.js";
import { printHelp } from "./utils/print_help.js";

if (process.argv[2] === "-h" || process.argv[2] === "--help") {
    printHelp();
} else if (process.argv[2] && process.argv[3]) {
    main(process.argv[2], process.argv[3], !!process.argv[4]);
} else {
    printHelp(true);
}
