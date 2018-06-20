import webpack from "koa-webpack";
import { config as ssrConfig } from "./control/webpack-ssr-config";
import { isIndexPath } from "./control/is-index-path";
import { appIndex } from "./control/app-index";

export const DevelopmentIndex = async () => {
    const webpackMiddleWare = await webpack({
        config: ssrConfig({ publicPath: "/", outputPath: "/" }),
        hotClient: false, // Firefox does not allow insecure operation, requires allowinsecurefromhttps=true + fails
    });
    return async (ctx, next) => {
        const path = ctx.path; // Serve index with Webpack, store original path
        if (isIndexPath({ path: ctx.path })) {
            ctx.path = "/";
        }
        await webpackMiddleWare(ctx, next);
        if (isIndexPath({ path: ctx.path })) {
            ctx.path = path;
            const html = await appIndex({ ctx, body: ctx.body });
            ctx.body = html;
        }
    };
};
