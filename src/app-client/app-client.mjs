import { ClientApp } from "hypersam/src/client";
import { appShell } from "../app-shell/app-shell";
import { Actions } from "../app-shell/actions";
import { Accept, nextAction } from "../app-shell/model";

ClientApp({
    app: appShell,
    rootElement: document.body,
    Accept,
    Actions,
    nextAction,
}).catch(error => {
    console.error("App error", error);
});
