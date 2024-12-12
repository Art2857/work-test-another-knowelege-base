import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { SwaggerConfig } from './common/open-api/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig.build(app);

  const prismaService = app.get(PrismaService);
  await prismaService.$connect();

  await app.listen(3000);
}
bootstrap();
