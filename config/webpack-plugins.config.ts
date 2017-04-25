import { config } from "./main.config";
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackPluginsFnc = () => {
    const prepareHtmlPlugins = config.htmls.map((html) =>
        new HtmlWebpackPlugin({
            filename: html,
            inject: "body",
            template: `${config.src}/${html}`,
        }));
    return [
        ...prepareHtmlPlugins,
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(config.env)
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "'development'",
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new ExtractTextPlugin({
            filename:  "style.css",
        })
    ]
};

export const plugins = webpackPluginsFnc();