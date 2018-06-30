export const accept = async ({ state, proposal }) => {
    try {
        if (proposal.route !== undefined) {
            state.route = proposal.route;
        }
        if (proposal.query !== undefined) {
            Object.assign(state.query, proposal.query);
        }
        if (proposal.title !== undefined) {
            state.title = proposal.title;
        }
        if (proposal.description !== undefined) {
            state.description = proposal.description;
        }
        const { counter } = proposal;
        if (counter !== undefined) {
            if (counter === null) {
                state.counter = 10;
            } else {
                if (state.counter + counter >= 0) {
                    state.counter += counter;
                }
            }
        }
        if (Array.isArray(proposal.posts)) {
            for (const post of proposal.posts) {
                const index = state.posts.findIndex(
                    x => x.title === post.title,
                );
                if (index !== -1) {
                    Object.assign(state.posts[index], post);
                } else {
                    state.posts.push(post);
                }
            }
        }
    } catch (error) {
        console.error("Acceptor error", error);
        throw error;
    }
};

export const nextAction = ({ state, actions }) => {
    const { counter } = state;
    if (counter > 0 && counter < 10) {
        actions.countDown();
    }
};
