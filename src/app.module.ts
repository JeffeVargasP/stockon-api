import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './database/prisma.service';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { AuthService } from './auth/auth.service';
import { CardController } from './card/card.controller';
import { CardService } from './card/card.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file/file.controller';

@Module({
  imports: [MailModule, MulterModule.register({ dest: './uploads' })],
  controllers: [AppController, UserController, CardController, FileController],
  providers: [AppService, UserService, PrismaService, MailService, AuthService, CardService],
})
export class AppModule {}
