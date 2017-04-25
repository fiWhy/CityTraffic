import { config } from './main.config';
import { webpackConfig } from './webpack.config';
import { devServerConfig } from './webpack-dev-server.config';
import 'core-js/es6/object';

const webpackServerConfigFnc = () => 
     Object.assign(webpackConfig(), {
        devServer: devServerConfig
    })

export const webpackDevServerConfig = webpackServerConfigFnc();
