import { join } from "path";
export const root = (...paths) => {
    const parentDir = `${__dirname}/../`;
    return join.apply(join, [parentDir].concat(paths));
}