import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './database/prisma.service';
import { AuthService } from './auth/auth.service';
import { CardController } from './card/card.controller';
import { CardService } from './card/card.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file/file.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MulterModule.register({ dest: './uploads' }), AuthModule, UserModule],
  controllers: [AppController, UserController, CardController, FileController],
  providers: [AppService, UserService, PrismaService, AuthService, CardService],
})
export class AppModule {}
