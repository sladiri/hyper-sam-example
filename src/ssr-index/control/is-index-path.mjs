const indexPathRegex = /^\/(app\/(.*))?$/;

export const isIndexPath = ({ path }) => {
    return !!indexPathRegex.exec(path);
};
