import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { https } from 'firebase-functions';

import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';

const initialize = async (expressInstance: express.Express) => {
  expressInstance.disable('x-powered-by');

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    {
      logger: new LoggerService(),
    },
  );

  app.useGlobalPipes(new ValidationPipe());

  return app.init();
};

const server = express();
void initialize(server);

export const api = https.onRequest(server);
