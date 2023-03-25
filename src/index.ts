//@ts-ignore
import login from "facebook-chat-api";
import { env } from "./env.js";
import { options } from "./libs/facebook-chat-api.js";
import { MessageInfo } from "./types/message.js";
// import { MessageInfo } from "./types/message";
import { convertCookieToAppState, readJsonFile } from "./utils/index.js";
import { getCurrentUserInfo, getUserInfo, log } from "./utils/logging.js";
import express from "express";

(async function () {
  const cookieFileContent = await readJsonFile(env.COOKIE_PATH);
  const appState = await convertCookieToAppState(cookieFileContent);
  const { ChatGPTAPI } = await import("chatgpt");
  const appChatGPT = new ChatGPTAPI({
    apiKey: env.OPENAI_API_KEY,
  });

  await login({ appState }, options, async (err: any, api: any) => {
    if (err) return console.error(err);

    log("Logged in as " + (await getCurrentUserInfo(api)).name);

    api.listenMqtt(async (_err: any, message: MessageInfo) => {
      if (!message?.body) {
        return;
      }

      if (startWith(message.body, "/help")) {
        api.sendMessage(
          `Hi, ${(await getCurrentUserInfo(api))?.name}!
            I'm a bot that can talk to you.
- /help: show this message
- /ping: check if I'm alive
- /gpt <your message>: talk to me with your message`,
          message.threadID
        );
      } else if (startWith(message.body, "/ping")) {
        api.sendMessage("pong", message.threadID);
      } else if (startWith(message.body, "/gpt")) {
        getUserInfo(api, message.senderID).then((data) => {
          log(`Message from ${data.name}: ${message.body}`);
        });
        const res = await appChatGPT.sendMessage(
          message.body.replace("/gpt ", "")
        );
        api.sendMessage(res.text, message.threadID);
      }
    });
  });
})();

export const startWith = (text: string, prefix: string) => {
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
