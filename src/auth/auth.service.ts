import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }

    async signIn(email: string, staySigned: boolean) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            return null;
        }

        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken
        

        return user;
    }

}
