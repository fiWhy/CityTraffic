import { loaders } from './webpack-loaders.config';
import { webpackConfig } from './webpack.config';

const karmaWebpackConf = () => {
    // return {
    //     rules: loaders,
    //     devtool: 'inline-source-map'
    // };
    let webpackConfigCopy: any = Object.assign({
        devtool: 'inline-source-map'
    }, webpackConfig(true));

    webpackConfigCopy.module.rules[0].use.unshift({
        loader: 'istanbul-instrumenter-loader'
    })
    
    return webpackConfigCopy;
}
export const karmaWebpackConfig = karmaWebpackConf();
