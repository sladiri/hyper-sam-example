const wait = delay => value =>
    new Promise(res => setTimeout(() => res(value), delay));

export const _Actions = ({ propose, service }) => {
    return Object.assign(Object.create(null), {
        async countDown({ value = -1 } = {}) {
            const { idInProgress } = service;
            const payload = { counter: value };
            if (value === null) {
                clearTimeout(idInProgress);
                await propose({ proposal: payload });
                service.idInProgress = null;
                return;
            }
            if (idInProgress) {
                return;
            }
            service.idInProgress = setTimeout(async () => {
                await propose({ proposal: payload });
                service.idInProgress = null;
            }, 1000);
        },
        async fetchPosts({ cancel = false } = {}) {
            const proposal = cancel
                ? {}
                : fetch("/posts")
                      .then(wait(1000))
                      .then(resp => resp.json())
                      .then(posts => ({ posts }));
            await propose({ proposal }, "fetchPosts");
        },
    });
};

export const Actions = ({ propose }) => {
    const actions = _Actions({
        propose,
        service: { idInProgress: null },
    });
    return actions;
};
