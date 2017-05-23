import { config } from "./main.config";
import { keysConfig } from "./keys.config";
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackPluginsFnc = (karma: boolean = false): any => {
    const plugins = [
        new webpack.SourceMapDevToolPlugin({
            filename: null, // if no value is provided the sourcemap is inlined
            test: /\.(ts|js)($|\?)/i // process .js and .ts files only
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(config.env)
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new ExtractTextPlugin({
            filename: "style.css",
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            title: "City Traffic",
            google: {
                apiKey: keysConfig.GOOGLE.API_KEY,
                libraries: keysConfig.GOOGLE.LIBRARIES,
            },
        }),
        new CopyWebpackPlugin([{ from: 'src/app/assets', to: config.serveFilesPath }])
    ];

    if (!karma) {
        return { plugins };
    } else {
        return {};
    }
};

export const plugins = webpackPluginsFnc;