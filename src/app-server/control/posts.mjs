import { posts as postsData } from "../../posts-data/posts";

export const posts = async ctx => {
    ctx.body = postsData.concat(
        [...postsData].map(p => ({
            ...p,
            title: `${p.title} ${Math.random()}`,
            content: `${p.content} ${Math.random()}`,
        })),
    );
};
