import { webpackDevServerConfig } from '../config/webpack-server.config';
import { config } from '../config/main.config';

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

const task = () => {
    let compiler = webpack(webpackDevServerConfig);
    let server = new WebpackDevServer(compiler, {});
    server.listen(config.serverPort);
}

task();