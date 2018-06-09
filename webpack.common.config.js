const path = require("path");
const Html = require("html-webpack-plugin");
const Favicons = require("favicons-webpack-plugin");
// https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1
const MiniCssExtract = require("mini-css-extract-plugin");
const postcssCssnext = require("postcss-cssnext");
const Visualiser = require("webpack-visualizer-plugin");
const Compression = require("compression-webpack-plugin");
const PreloadHtml = require("preload-webpack-plugin");
const Minify = require("babel-minify-webpack-plugin");

const paths = ({ outputPath }) => {
    const base = process.cwd();
    const webroot = path.join(base, outputPath);
    const favicon = path.join(base, "icons8-socks.png");
    const src = path.join(base, "src");
    const appClient = path.join(src, "app-client", "app-client.mjs");
    const appClientCss = path.join(src, "app-client", "app-client.pcss");

    return {
        webroot,
        favicon,
        src,
        appClient,
        appClientCss,
    };
};

const config = ({ debug = false, paths, publicPath }) => {
    return {
        mode: debug ? "development" : "production",
        entry: { index: [paths.appClientCss, paths.appClient] },
        output: {
            pathinfo: debug,
            path: paths.webroot,
            filename: "[name].[hash].mjs",
            publicPath,
        },
        optimization: debug ? undefined : { splitChunks: { chunks: "all" } },
        module: {
            rules: [
                {
                    test: /\.js$|\.mjs$/,
                    include: paths.src,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: debug,
                            plugins: ["@babel/plugin-syntax-dynamic-import"],
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        debug: true,
                                        spec: true,
                                        modules: false,
                                        useBuiltIns: "usage",
                                        targets: {
                                            node: "10.3.0", // target named node exports
                                            browsers: [
                                                // target native async function and generators
                                                "chrome >= 55",
                                                "edge >= 15",
                                                "firefox >= 53",
                                                "safari >= 10.1",
                                                "and_chr >= 55",
                                                "and_ff >= 53",
                                                "ios_saf >= 10.3",
                                                "and_uc >= 11.8",
                                                "samsung >= 6.2",
                                            ],
                                        },
                                    },
                                ],
                            ],
                        },
                    },
                },
                {
                    test: /\.pcss$/,
                    use: [
                        // MiniCssExtractPlugin has no HMR support https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34
                        // debug
                        //   ? { loader: "style-loader", options: { sourceMap: true } }
                        //   : MiniCssExtractPlugin.loader,
                        // But we cannot use it in HTTPS (Firefox), so we use it anyway
                        MiniCssExtract.loader,
                        { loader: "css-loader", options: { sourceMap: debug } },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: debug ? "inline" : false, // true does not seem to work, with dev-server at least, need to try production
                                plugins: [postcssCssnext],
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new Favicons({
                logo: paths.favicon,
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    favicons: true,
                    firefox: false,
                },
            }),
            new MiniCssExtract({ filename: "index.[contenthash].css" }),
            new Html({
                minify: debug ? false : {},
                // Template is generated from SSR via ViperHtml (ejs-loader)
                meta: {
                    viewport: "width=device-width", // https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
                    description: "Author: Sladi Ri, Length: 1 pages",
                },
                template: "index-template.ejs",
            }),
        ].concat(
            debug
                ? []
                : [
                      new PreloadHtml(),
                      new Minify(
                          { mangle: { topLevel: true } },
                          { test: /\.js($|\?)|\.mjs($|\?)/i },
                      ),
                      new Compression(),
                      new Visualiser({ filename: "statistics.html" }),
                  ],
        ),
    };
};

module.exports = { paths, config };
