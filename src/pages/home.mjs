import { countDown } from "../components/count-down";
import { posts } from "../components/posts";

export const title = "Bolt-on Prototype";
export const description = "Bolt-on Prototype Description";

export const home = props => {
    const { render, cn, state, actions } = props;
    return render`
        <h1 id="Main" tabindex="-1">CountDown Test</h1>
        <section>
            ${cn(countDown, {
                counter: state.counter,
                countDown: actions.countDown,
            })}
        </section>
        <section>
            ${posts(props)}
        </section>
        `;
};

export const Home = {
    title,
    description,
    page: home,
};
