import { ClientApp } from "hypersam/src/client";
import { appShell } from "../app-shell/app-shell";
import { Actions } from "../app-shell/actions";
import { accept, nextAction } from "../app-shell/model";

ClientApp({
    app: appShell,
    rootElement: document.body,
    accept,
    actions: Actions(),
    nextAction,
}).catch(error => {
    console.error("App error", error);
});
