import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerConfig = async (app: any, port: number) => {
  const config = new DocumentBuilder()
    .setTitle('Nest Basics')
    .setDescription('Sample APIs')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`, 'Local environment')
    .build();
  return SwaggerModule.createDocument(app, config);
};

export { swaggerConfig };
