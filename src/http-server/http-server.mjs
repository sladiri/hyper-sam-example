import { readFileSync } from "fs";
import http2 from "http2";
import { AppServer } from "../app-server/app-server";

const host = "localhost";
const port = 9900;
const key = readFileSync("./privkey.pem", "utf8");
const cert = readFileSync("./cert.pem", "utf8");

(async () => {
    try {
        const app = await AppServer({ publicPath: "public" });
        const appServer = http2.createSecureServer(
            { key, cert },
            app.callback(),
        );
        appServer.listen({ host, port }, error => {
            const serverPath = `https://${host}:${port}`;
            if (!error) {
                console.log(`App server [ ${serverPath} ] listen OK.`);
                return;
            }
            console.error(
                `App server [ ${serverPath} ] listen error`,
                error,
                error && error.stack,
            );
            throw error;
        });
    } catch (error) {
        console.error("HTTP-server error:", error);
        process.exit(1);
    }
})();
