require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { debugLog, logger } from './shared/logger';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import { join } from 'path';
const express = require('express')

async function bootstrap() {
  let app = null;
  const server = express();
  app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const options = new DocumentBuilder()
    .setTitle('Computer APIs')
    .setDescription('Computer APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Bearer *token*',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      'JWT',
    )
    .addSecurityRequirements('JWT')
    .build();

    const document = SwaggerModule.createDocument(app, options);
    writeSwaggerJson(`${process.cwd()}`, document);
    SwaggerModule.setup('docs', app, document);

  app.use('/public', express.static(join(__dirname, '..', 'public'))); //
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(logger);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.init();
  http.createServer(server).listen(process.env.PORT || 3000);
  debugLog(`Application is running on: ${process.env.PORT || 3000} and ${process.env.HTTPS_PORT || 3001}`);
}
bootstrap();

export const writeSwaggerJson = (path: string, document) => {
  fs.writeFileSync(`${path}/swagger.json`, JSON.stringify(document, null, 2), { encoding: 'utf8' });
};
