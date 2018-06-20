import { Home } from "../pages/home";

export const pages = {
    home: Home,
};

export const appShell = props => {
    const { render } = props;
    return render`
        <main>${pages.home.page(props)}</main>
        `;
};
