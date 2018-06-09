import Koa from "koa";
import route from "koa-route";
import mount from "koa-mount";
import serve from "koa-static";
import { posts } from "./control/posts";
import { ProductionIndex } from "../ssr-index/production-index";
import { DevelopmentIndex } from "../ssr-index/development-index";

export const AppServer = ({ publicPath }) => {
    const isProduction = process.env.NODE_ENV === "production";
    const filePath = isProduction ? "/" : `/${publicPath}`;
    const ssrIndex = isProduction
        ? ProductionIndex({ publicPath })
        : DevelopmentIndex();
    const app = new Koa();
    app.use(errorHandler);
    app.use(setXResponseTime);
    app.use(route.get("/posts", posts));
    app.use(ssrIndex);
    app.use(mount(filePath, serve(`./${publicPath}`)));
    return app;
};

export const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.error("Server error", error);
        ctx.status = 500;
        ctx.body = error.message;
    }
};

export const setXResponseTime = async (ctx, next) => {
    const start = Date.now();
    await next();
    const ttTotalMs = Date.now() - start;
    ctx.set("X-Response-Time", `${ttTotalMs}ms`);
    console.log(`Responded to [ ${ctx.method} ${ctx.path} ] in ${ttTotalMs}ms`);
};
