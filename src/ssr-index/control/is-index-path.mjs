export const isIndexPath = ({ path }) => {
    const result =
        path.startsWith("/") &&
        !(
            path.startsWith("/public") ||
            path.startsWith("/api") ||
            path.endsWith(".gz") ||
            path.endsWith(".mjs") ||
            path.endsWith(".css") ||
            path.includes(".gz?") ||
            path.includes(".mjs?") ||
            path.includes(".css?")
        );
    return result;
};
