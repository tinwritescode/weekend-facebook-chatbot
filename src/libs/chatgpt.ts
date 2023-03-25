import { env } from "../env.js";

export const getChatGptInstance = async () => {
  const { ChatGPTAPI } = await import("chatgpt");

  return new ChatGPTAPI({
    apiKey: env.OPENAI_API_KEY,
  });
};
