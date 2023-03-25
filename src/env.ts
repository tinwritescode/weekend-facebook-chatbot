import { z } from "zod";
import dotenv from "dotenv";

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  PORT: z.coerce.number().default(3200),
  COOKIE_PATH: z.string().default("./config/cookie.json"),
});

dotenv.config();
export const env = envSchema.parse(process.env);
