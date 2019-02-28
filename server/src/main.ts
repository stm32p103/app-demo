import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'dist/public'));

    const options = new DocumentBuilder()
    .setTitle('Sample')
    .setDescription('Sample description.')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument( app, options );
    SwaggerModule.setup('api', app, document);
  
    await app.listen( 3000 );
}
bootstrap();
