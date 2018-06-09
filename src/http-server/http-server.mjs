import { readFileSync } from "fs";
import http2 from "http2";
import { AppServer } from "../app-server/app-server";

const host = "localhost";
const appPort = 9900;
const key = readFileSync("./privkey.pem", "utf8");
const cert = readFileSync("./cert.pem", "utf8");

const serverCallback = ({ host, port }) => error => {
    if (error) {
        console.error(
            `Server [ https://${host}:${port} ] listen error`,
            error,
            error && error.stack,
        );
        throw error;
    } else {
        console.log(`Server [ https://${host}:${port} ] listen OK.`);
    }
};

(async () => {
    const app = AppServer({ publicPath: "public" });
    const appServer = http2.createSecureServer({ key, cert }, app.callback());
    const appServerOptions = { host, port: appPort };
    appServer.listen(appServerOptions, serverCallback(appServerOptions));
})().catch(error => {
    console.error("HTTP-server error:", error);
    process.exit(1);
});
