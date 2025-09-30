import fs from "fs";
import path from "path";

import { debug as initDebugging } from "./utils/debug.js";

const main = (from = "./", to = "./photos/", debug = false) => {
    const writeDebug = initDebugging(debug);
    writeDebug("main executed with params ", from, to, debug);

    try {
        console.log("======Image Suiter has been started======");
        const root = path.join(from);
        const dest = path.join(to);

        writeDebug("checking if there is dest folder");
        if (!fs.existsSync(dest)) {
            writeDebug("there is no such folder, creating...");
            fs.mkdirSync(dest);
            writeDebug(`"${dest}" folder has been created`);
        } else {
            writeDebug("there is some folder. No need to create one");
        }

        writeDebug("reading folder", root);
        const files = fs.readdirSync(root);
        writeDebug("files count", files.length ?? 0);

        if (files.length === 0) {
            throw new Error(`There is no files in ${from}`);
        }

        writeDebug("sorting");
        const sortedFiles = files.sort((fileA, fileB) => {
            if (!fs.existsSync) {
                return (
                    fs.statSync(root + fileA).mtime.getTime() -
                    fs.statSync(root + fileB).mtime.getTime()
                );
            }
        });
        writeDebug("files sorted");

        if (debug) {
            sortedFiles.forEach((file, index) => {
                if (fs.statSync(path.join(root, file)).isFile()) {
                    writeDebug(
                        `(${index}) --> ${
                            fs.statSync(path.join(root, file)).mtime
                        } w name ${file}`
                    );
                }
            });
        }

        writeDebug("moving files");
        let i = 0;
        sortedFiles.forEach((file) => {
            if (fs.statSync(path.join(root, file)).isFile()) {
                const ext = file.split(".")[1];

                if (!ext) {
                    writeDebug(
                        `file "${file}" is ignored cuz it doesn't have an EXT`
                    );
                    return;
                }

                const _dest = path.join(dest, i.toString() + "." + ext);
                fs.copyFileSync(path.join(root, file), _dest);

                console.log(`File "${file}" copied to ${_dest}`);
                i += 1; // явно итерирую чтобы не продолбать
            }
        });

        console.log("======All images has been transfered======");
        console.log(`go to ${to}`);
    } catch (e) {
        console.error(e);
    }
};

export { main };
