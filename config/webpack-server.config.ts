import { config } from './main.config';
import { webpackConfig } from './webpack.config';
import { devServerConfig } from './webpack-dev-server.config';

const webpackServerConfigFnc = () =>
    Object.assign(webpackConfig(), {
        devServer: devServerConfig
    });

export const webpackDevServerConfig = webpackServerConfigFnc();
