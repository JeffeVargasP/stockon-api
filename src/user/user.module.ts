import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService, AuthService],
})
export class UserModule {}
