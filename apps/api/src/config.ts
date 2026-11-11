import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_PORT: z.coerce.number().default(4000),
  API_HOST: z.string().default('0.0.0.0'),
  CORS_ORIGIN: z.string().default('*'),
  DATABASE_URL: z.string().optional(),
  AI_ENGINE_URL: z.string().default('http://localhost:8000'),
  REACTIVE_RPC_URL: z.string().default('https://kopli-rpc.reactive.network'),
});

export type AppConfig = z.infer<typeof EnvSchema>;

export function loadConfig(): AppConfig {
  const result = EnvSchema.safeParse(process.env);
  if (!result.success) {
    console.error('Invalid environment variables:', result.error.format());
    throw new Error('Environment configuration validation failed');
  }
  return result.data;
}

export const config = loadConfig();

