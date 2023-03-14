import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SerializerInterceptor } from './shared/utils/serializer.interceptor';
import validationOptions from './shared/utils/validation-options';
import {debugLog} from "./shared/logger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get(ConfigService);

    app.enableShutdownHooks();

    app.useGlobalInterceptors(new SerializerInterceptor());
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    const config = new DocumentBuilder()
        .setTitle('Computer API')
        .setDescription('Tu Nguyen Project III')
        .setVersion('1.0')
        .addTag('Computer Store')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(configService.get('app.port'));
    debugLog(`Server start at port ${configService.get('app.port')} `)
}
bootstrap();
