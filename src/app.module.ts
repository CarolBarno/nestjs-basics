import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypedEventEmitterModule } from './event-emitter/event-emitter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    TerminusModule,
    HealthModule,
    EmailModule,
    EventEmitterModule.forRoot(),
    TypedEventEmitterModule,
  ],
})
export class AppModule {}
