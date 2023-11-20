import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
const jwt = require('jsonwebtoken');
require('dotenv').config();

@Injectable()
export class AuthService {
  async signIn(email: string, stayLogged: boolean) {
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: stayLogged ? '30d' : '1d',
    });

    return token;
  }
}
