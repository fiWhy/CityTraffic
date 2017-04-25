import { root } from "../lib/root";
const configFnc = () => {
    const src = root("./src");
    const assets = root("./src", "assets");
    const components = root("src", "components");
    const configRoot = root("config");
    const srcRelative = "/";
    const app = root("./src", "app");
    const docs = "../docs";
    const reports = root("reports");
    const exclude = [/node_modules/, /\.spec.ts$/];
    const distFileName = "[name].bundle.js";
    const assetsPathPattern = "[name].[ext]";
    const entry = src + "/main.ts";
    const dist = root("./dist");
    const vendor = [
        src + "/polyfills.ts",
    ];
    const env = "development";

    const extensions = [".ts", ".tsx", ".js", ".scss", ".json", "css"];


    const serverPort = 8081;

    const cssPath = "/static/сss/";
    const fontsPath = "/static/fonts";

    const htmls = [
        "index.html",
    ]

    return {
        src,
        env,
        app,
        dist,
        docs,
        htmls,
        entry,
        vendor,
        assets,
        reports,
        exclude,
        cssPath,
        fontsPath,
        configRoot,
        components,
        serverPort,
        extensions,
        srcRelative,
        distFileName,
        assetsPathPattern,
    }
}

export const config = configFnc();