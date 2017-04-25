const webpack = require("webpack");
const fs = require("fs");

import { config } from "../config/main.config";
import { webpackProdConfig } from "../config/webpack.prod.config";
import { webpackDevServerConfig } from "../config/webpack-server.config";
import { rmdir } from "../lib/rmdir";

function task() {
    rmdir(config.dist);
    console.log("Removed old build folder");
    webpack(webpackProdConfig,  () => {
        console.log("Ready");
    });
}

task();