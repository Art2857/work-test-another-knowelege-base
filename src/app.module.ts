import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ArticlesModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
