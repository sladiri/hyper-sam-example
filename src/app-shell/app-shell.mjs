import { Home } from "../pages/home";

export const appShell = props => {
    const { render } = props;
    return render`
        <main>${Home.page(props)}</main>
        `;
};
