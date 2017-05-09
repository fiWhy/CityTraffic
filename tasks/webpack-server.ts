import { webpackDevServerConfig } from '../config/webpack-server.config';
import { config } from '../config/main.config';

import * as WebpackDevServer from "webpack-dev-server";
import * as webpack from "webpack";

const task = () => {
    let compiler = webpack(webpackDevServerConfig);

    let server = new WebpackDevServer(compiler, {
        publicPath: "",
    });
    server.listen(config.serverPort);
}

task();