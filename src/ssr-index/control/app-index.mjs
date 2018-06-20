import { SsrApp } from "hypersam/src/server";
import { appShell as app, pages } from "../../app-shell/app-shell";
import { Accept } from "../../app-shell/model";
import { posts } from "../../posts-data/posts";

console.assert(pages.home && pages.home.page, "Routing: Home page required");

export const state = Object.assign(Object.create(null), {
    route: "",
    query: Object.create(null),
    title: "",
    description: "",
    counter: 10,
    posts: [],
});

export const service = () => ({ db: {} }); // TODO: connect to DB here?

export const ssrOptions = { state, app, Accept, service };

export const routeRegex = /^\/(.+)?$/;

export const appIndex = async ({ ctx, body }) => {
    const [, route = "home"] = routeRegex.exec(ctx.path) || [];
    const query = Object.assign(Object.create(null), ctx.query);
    const { title, description } = pages[route] || pages.home;
    const { renderHTMLString, accept } = SsrApp(ssrOptions);
    await accept({ proposal: { route, query, title, description, posts } });
    const appString = renderHTMLString();
    const index = body
        .toString()
        .replace("#title#", title)
        .replace("#description#", description)
        .replace(/<body></, `<body>${appString}<`);
    return index;
};
