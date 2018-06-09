import { readFileSync } from "fs";
import { isIndexPath } from "./control/is-index-path";
import { appIndex } from "./control/app-index";

export const ProductionIndex = ({ publicPath }) => {
    const cache = new Map();
    const ssrIndex = SsrIndex({ publicPath });
    return async (ctx, next) => {
        if (!isIndexPath({ path: ctx.path })) {
            await next();
            return;
        }
        const cacheKey = ctx.path;
        const isCached = cache.has(cacheKey);
        const html = isCached ? cache.get(cacheKey) : await ssrIndex({ ctx });
        if (!isCached) {
            cache.set(cacheKey, html);
            console.log("SSR Cache Length", cache.size);
        }
        ctx.body = html;
    };
};

export const SsrIndex = ({ publicPath }) => async ({ ctx }) => {
    const start = Date.now();
    const indexFile = readFileSync(`./${publicPath}/index.html`, "utf8");
    const html = await appIndex({ ctx, body: indexFile });
    const ttRenderMs = Date.now() - start;
    ctx.set(
        "Server-Timing",
        `Prerender;dur=${ttRenderMs};desc="Server render time (ms)"`,
    );
    return html;
};
