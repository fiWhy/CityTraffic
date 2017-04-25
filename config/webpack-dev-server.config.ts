import { config } from "./main.config";
const devServerConf = () => {
    return {
        colors: true,
        contentBase: config.src,
        historyApiFallback: true,
        inline: true,
    }
}
export const devServerConfig =  devServerConf();
