import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './database/prisma.service';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MailModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService, MailService],
})
export class AppModule {}
