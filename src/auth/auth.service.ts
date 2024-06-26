import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login(email: string, password: string): Promise<AuthEntity> {

        const user = await this.prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            throw new NotFoundException(`No user found for email`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            userId: user.id,
            name: user.name,
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            biography: user.biography,
            bornDate: user.bornDate,
            accessToken: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET}),
        };
    }
}