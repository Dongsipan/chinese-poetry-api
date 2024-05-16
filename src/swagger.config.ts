import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Chinese Poetry API')
  .setDescription('最全中文诗歌古典文集数据库')
  .setVersion('1.0')
  .build();

export const createSwaggerDocument = (app) => {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerCDN = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.2';
  if (process.env.NODE_ENV === 'development') {
    SwaggerModule.setup('', app, document);
  } else {
    SwaggerModule.setup('', app, document, {
      customCssUrl: [`${swaggerCDN}/swagger-ui.css`],
      customJs: [
        `${swaggerCDN}/swagger-ui-bundle.js`,
        `${swaggerCDN}/swagger-ui-standalone-preset.js`,
      ],
    });
  }
};
