import { config } from "./main.config";
import { webpackConfig } from "./webpack.config";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const webpackProdConf = () => {
    const newPlugins = [
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new CopyWebpackPlugin([
            { from: `${config.assets}/fonts/bootstrap`, to: `${config.dist}/assets/fonts/bootstrap` },
            { from: `${config.assets}/fonts/Ubuntu_Condensed`, to: `${config.dist}/assets/fonts/Ubuntu_Condensed` },
            { from: `${config.assets}/images`, to: `${config.dist}/assets/images`},
            { from: `${config.assets}/audio`, to: `${config.dist}/assets/audio`},
        ])];
        
        const preparedWebpackConfig: any = webpackConfig();

        preparedWebpackConfig.output.publicPath =  config.fontsPath;

        preparedWebpackConfig.plugins = preparedWebpackConfig.plugins.concat(newPlugins);
        return preparedWebpackConfig;
};

export const webpackProdConfig = webpackProdConf();