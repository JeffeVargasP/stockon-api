import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { CardController } from './card/card.controller';
import { CardService } from './card/card.service';
import { PrismaService } from './prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file/file.controller';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'src/.env'}),
    MulterModule.register({ dest: './uploads' }),
    PassportModule, UserModule, AuthModule, PrismaModule, JwtModule, PassportModule
  ],
  controllers: [AppController, UserController, CardController, FileController, AuthController],
  providers: [AppService, UserService, PrismaService, CardService, AuthService],
})
export class AppModule { }
