import { config } from "./main.config";
import { loaders } from "./webpack-loaders.config";
import { plugins } from "./webpack-plugins.config";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

export const webpackConfig = (karma: boolean = false) => {
    const preparedEntry = karma ? {} : {
        entry: {
            app: config.entry,
            vendor: config.vendor,
        },
        devtool: 'inline-source-map'
    };

    const pluginsObject = plugins(karma);
    return Object.assign({
        module: {
            rules: loaders(karma),
        },
        output: {
            filename: config.distFileName,
            path: config.dist,
            publicPath: "",
        },
        resolve: {
            extensions: config.extensions,
        },
    }, preparedEntry, pluginsObject);
};