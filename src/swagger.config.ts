import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Chinese Poetry API')
  .setDescription('最全中文诗歌古典文集数据库')
  .setVersion('1.0')
  .build();

export const createSwaggerDocument = (app) => {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, document);
};
