import { loaders } from './webpack-loaders.config';
import { webpackConfig } from './webpack.config';

const karmaWebpackConf = () => {
    let webpackConfigObjeect: any = webpackConfig(true);

    webpackConfigObjeect.module.rules[0].use.unshift({
        loader: 'istanbul-instrumenter-loader', 
    })

    return webpackConfigObjeect;
}
export const karmaWebpackConfig = karmaWebpackConf();
