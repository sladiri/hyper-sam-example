const wait = delay => value =>
    new Promise(res => setTimeout(() => res(value), delay));

export const _Actions = ({ service }) => {
    return Object.assign(Object.create(null), {
        countDown: propose => async ({ value = -1 } = {}) => {
            const { idInProgress } = service;
            const payload = { counter: value };
            if (value === null) {
                clearTimeout(idInProgress);
                await propose(payload);
                service.idInProgress = null;
                return;
            }
            if (idInProgress) {
                return;
            }
            service.idInProgress = setTimeout(async () => {
                await propose(payload);
                service.idInProgress = null;
            }, 1000);
        },
        fetchPosts: propose => async ({ cancel = false } = {}) => {
            const proposal = cancel
                ? {}
                : fetch("/posts")
                      .then(wait(1000))
                      .then(resp => resp.json())
                      .then(posts => ({ posts }));
            await propose(proposal, true);
        },
    });
};

export const Actions = () => {
    const actions = _Actions({
        service: { idInProgress: null },
    });
    return actions;
};
