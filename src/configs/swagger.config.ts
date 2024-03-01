import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerConfig = async (app: any) => {
  const config = new DocumentBuilder()
    .setTitle('Nest Basics')
    .setDescription('Sample APIs')
    .setVersion('1.0')
    .build();
  return SwaggerModule.createDocument(app, config);
};

export { swaggerConfig };
