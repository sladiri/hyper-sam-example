import { Home } from "../pages/home";

export const appShell = props => {
    const { render, cn } = props;
    return render`
        <main>${cn(Home.page)}</main>
        `;
};
