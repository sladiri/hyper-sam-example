const { paths, config } = require("./webpack.common.config");

module.exports = config({
    publicPath: "/",
    paths: paths({ outputPath: "public" }),
});
