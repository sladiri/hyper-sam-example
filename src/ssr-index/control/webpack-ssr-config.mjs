import commonConfig from "../../../webpack.common.config";

export const config = ({ publicPath, outputPath }) => {
    return commonConfig.config({
        debug: true,
        publicPath,
        paths: commonConfig.paths({ outputPath }),
    });
};
