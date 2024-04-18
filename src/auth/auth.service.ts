import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
require('dotenv').config();

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService, private userService: UserService) { }

  async hashPassword(password: string) {

    return await hash(password, 10);

  }

  async comparePasswords(password: string, hashedPassword: string) {

    return await compare(password, hashedPassword);

  }

  async generateToken(email: string, userId: string) {

    const token = this.jwtService.signAsync({ email: email, userId: userId, role: 'USER' });

    return token;
  }

  async authenticateToken(token: string) {

    return this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });

  }

  async signIn(email: string, password: string) {

    const user = await this.userService.findOne(email);
    const userId = user.id;
    if (user && await this.comparePasswords(password, user.password)) {
      return { token: await this.generateToken(email, userId.toString()) };
    }
    return null;

  }

}
