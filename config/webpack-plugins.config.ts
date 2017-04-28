import { config } from "./main.config";
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

const webpackPluginsFnc = () => {
    return [
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
        new TypedocWebpackPlugin({
            name: "Contoso",
            mode: "file",
            theme: "default",
            out: config.docs,
            includeDeclarations: false,
            ignoreCompilerErrors: true,
        }, './src/app')
    ]
};

export const plugins = webpackPluginsFnc();