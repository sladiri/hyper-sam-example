import { countDown } from "../components/count-down";
import { posts } from "../components/posts";

export const title = "SAM Example";
export const description =
    "Example of app-state managment with the SAM pattern";

export const Home = {
    title,
    description,
    page: props => {
        const { render, cn, state, actions } = props;
        return render`
            <section>
                <h1 id="Main" tabindex="-1">CountDown Test</h1>
                ${cn(countDown, {
                    counter: state.counter,
                    countDown: actions.countDown,
                })}
            </section>
            <section>
                <h1 id="Main" tabindex="-1">Cancel Test</h1>
                ${posts(props)}
            </section>
            `;
    },
};
