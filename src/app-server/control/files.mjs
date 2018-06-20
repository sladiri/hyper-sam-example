import serve from "koa-static";

export const Files = ({ publicPath }) => serve(`./${publicPath}`);
