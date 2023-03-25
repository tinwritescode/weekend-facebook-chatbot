import login from 'fca-unofficial';
import { z } from 'zod';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import express from 'express';

const envSchema = z.object({
    OPENAI_API_KEY: z.string(),
    PORT: z.coerce.number().default(3200),
    COOKIE_PATH: z.string().default("./config/cookie.json"),
});
dotenv.config();
const env = envSchema.parse(process.env);

const options = {
    forceLogin: true,
    logLevel: /^win/.test(process.platform) ? "verbose" : "warn",
    listenEvents: true,
    // selfListen: true,
    updatePresence: true,
    autoMarkDelivery: true,
    autoMarkRead: true,
};

const readJsonFile = (path) => {
    return fs.readFile(path, 'utf8').then(JSON.parse);
};
// convert cookie to appstate
const convertCookieToAppState = async (cookieContent) => {
    const cookie = cookieContent?.cookies;
    if (!cookie) {
        throw new Error('cookie is not found');
    }
    // replace all "name" with "key"
    cookie.forEach((item) => {
        item.key = item.name;
        delete item.name;
    });
    return cookie;
};

const log = (message) => {
    return console.log(`[LOG-${new Date().toLocaleTimeString()}] ${message}`);
};
const error = (message) => {
    return console.error(`[ERROR-${new Date().toLocaleTimeString()}] ${message}`);
};
const getCurrentUserInfo = (api) => {
    return new Promise(async (resolve, reject) => {
        api.getUserInfo([await api.getCurrentUserID()], (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data[Object.keys(data)[0]]);
        });
    });
};
const getUserInfo = (api, userID) => {
    return new Promise(async (resolve, reject) => {
        api.getUserInfo([userID], (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data[Object.keys(data)[0]]);
        });
    });
};

//@ts-ignore
(async function () {
    log("Starting bot...");
    log("Reading cookie file...");
    const cookieFileContent = await readJsonFile(env.COOKIE_PATH);
    log("Converting cookie file to app state...");
    const appState = await convertCookieToAppState(cookieFileContent);
    const { ChatGPTAPI } = await import('chatgpt');
    const appChatGPT = new ChatGPTAPI({
        apiKey: env.OPENAI_API_KEY,
    });
    log("Logging in...");
    await login({ appState }, options, async (err, api) => {
        if (err) {
            const errMessage = err?.[0]?.message || err;
            return error(errMessage);
        }
        log("Logged in as " + (await getCurrentUserInfo(api)).name);
        api.listenMqtt(async (err, message) => {
            if (err) {
                const errMessage = err?.[0]?.message || err;
                api.sendMessage(`Error: ${errMessage}`);
                return error(errMessage);
            }
            if (!message?.body) {
                return;
            }
            if (startWith(message.body, "/help")) {
                api.sendMessage(`Hi, ${(await getCurrentUserInfo(api))?.name}!
            I'm a bot that can talk to you.
- /help: show this message
- /ping: check if I'm alive
- /gpt <your message>: talk to me with your message`, message.threadID);
            }
            else if (startWith(message.body, "/ping")) {
                api.sendMessage("pong", message.threadID);
            }
            else if (startWith(message.body, "/gpt")) {
                getUserInfo(api, message.senderID).then((data) => {
                    log(`Message from ${data.name}: ${message.body}`);
                });
                const res = await appChatGPT.sendMessage(message.body.replace("/gpt ", ""));
                api.sendMessage(res.text, message.threadID);
                log(`Message to ${message.threadID}: ${res.text.slice(0, 20)}...`);
            }
        });
    });
})();
const startWith = (text, prefix) => {
    return text.startsWith(prefix);
};
// FAKE EXPRESSJS
const app = express();
const port = env.PORT;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

export { startWith };
