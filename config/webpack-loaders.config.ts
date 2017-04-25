import { config } from './main.config';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const loadersConf = () => {
    return [
        {
            test: /\.ts$/,
            exclude: config.exclude,
            use: [
                { loader: 'ts-loader' },
                { loader: 'tslint-loader' }
            ]

        },
        {
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    { loader: 'css-loader' },
                    { loader: 'autoprefixer-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                config.src
                            ]
                        }
                    }
                ]
            })
        },
        {
            test: /\.json$/,
            loader: 'json-loader',
            exclude: config.exclude,
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader",
            options: {
                name: "[name].[ext]",
                limit: 10000,
                mimetype: "application/font-woff"
            }
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]"
            }
        },
        {
            test: /\.html$/,
            loaders: [
                'html-loader',
            ],
            exclude: config.exclude
        }
    ]

}

export const loaders = loadersConf();