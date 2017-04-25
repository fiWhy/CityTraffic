const fs = require("fs");

export const rmdir = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                rmdir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};