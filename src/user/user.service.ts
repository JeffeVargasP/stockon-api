import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { PrismaService } from 'src/database/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly mail: MailService, private readonly authService: AuthService) {}

  async loginUser(email: string, stayLogged: boolean) {

    if (!email) {
      return {
        message: 'Email is required',
      };
    }


    const user = await this.findUserByEmail(email);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    if (!user.active) {
      return {
        message: 'User not activated',
      };
    }

    const stayLoggedKey = await this.authService.signIn(user.email, user.stayLogged);

    await this.mail.loginMail(user.name, user.email, stayLoggedKey);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stayLoggedKey: stayLoggedKey,
        stayLogged:  stayLogged,
      },
    });

    return {
      message: 'User logged in successfully',
      name: user.name,
      email: user.email,
    };

  }
   
  async stayLogged(stayLoggedKey: string) {

    if (!stayLoggedKey) {
      return {
        message: 'Stay logged key is required',
      };
    }

    const userByStayLoggedKey = await this.prisma.user.findFirst({
      where: {
        stayLoggedKey: stayLoggedKey,
      },
    });

    if (!userByStayLoggedKey) {
      return {
        message: 'User not found',
      };
    }

    return {
      message: 'User logged in successfully',
      name: userByStayLoggedKey.name,
      email: userByStayLoggedKey.email,
    };

  }

  async findUserByEmail(email: string) {
    
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createUser(createUserDTO): Promise<object> {
    const emailExists = await this.findUserByEmail(createUserDTO.email);

    if (emailExists) {
      return {
        message: 'Email already exists',
      };
    }
    
    const newUser = await await this.prisma.user.create({
      data: createUserDTO,
    })

    await this.mail.activationMail(newUser.name, newUser.email, newUser.activationKey)

    return {
      message: 'User created successfully',
      name: newUser.name,
      email: newUser.email,
    }


  }

  async activeUser(activationKey: string): Promise<object> {
    const userByActivationKey = await this.prisma.user.findFirst({
      where: {
        activationKey: activationKey,
      },
    });

    if (!userByActivationKey) {
      return {
        message: 'User not found',
      };
    }

    await this.prisma.user.update({
      where: {
        id: userByActivationKey.id,
      },
      data: {
        active: true,
        activationKey: null,
      },
    });

    return {
      message: 'User activated successfully',
      name: userByActivationKey.name,
      email: userByActivationKey.email,
    };
  }

  async deleteUser(deleteKey: string): Promise<object> {
    const userByDeleteKey = await this.prisma.user.findFirst({
      where: {
        deleteKey: deleteKey,
      },
    });

    if (!userByDeleteKey) {
      return {
        message: 'User not found',
      };
    }

    await this.prisma.user.delete({
      where: {
        id: userByDeleteKey.id,
      },
    });

    return {
      message: 'User deleted successfully',
      name: userByDeleteKey.name,
      email: userByDeleteKey.email,
    };
  }
}
