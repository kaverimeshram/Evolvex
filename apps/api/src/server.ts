import { buildApp } from './app.js';
import { config } from './config.js';

async function start() {
  const app = await buildApp();

  try {
    const address = await app.listen({
      port: config.API_PORT,
      host: config.API_HOST,
    });
    app.log.info(`EvolveX API running at ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

