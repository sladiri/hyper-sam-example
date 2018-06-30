import { countDown } from "../components/count-down";
import { posts } from "../components/posts";

export const title = "SAM Example";
export const description =
    "Example of app-state managment with the SAM pattern";

export const Home = {
    skips: [["Main", "Main Content"]],
    title,
    description,
    page: props => {
        const { cn } = props;
        return cn(home);
    },
};

export const home = props => {
    const { render } = props;
    return render`
        <section>
            <h1>Automatic Next Action Test</h1>
            ${countDown(props)}
        </section>
        <section>
            <h1>Cancellable Action Test</h1>
            ${posts(props)}
        </section>
        `;
};
