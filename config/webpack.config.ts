import { config } from "./main.config";
import { loaders } from "./webpack-loaders.config";
import { plugins } from "./webpack-plugins.config";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackConfFnc = () => {
    return {
        entry: {
            app: config.entry,
            vendor: config.vendor,
        },
        module: {
            rules: loaders,
        },
        output: {
            filename: config.distFileName,
            path: config.dist,
            publicPath: "",
        },
        resolve: {
            alias: {
                vue$: "vue/dist/vue.esm.js",
            },
            extensions: config.extensions,
        },
        plugins,
    };
};

export const webpackConfig = webpackConfFnc();