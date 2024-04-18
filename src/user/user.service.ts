import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import User from './user.interface';
import { isStrongPassword } from 'class-validator';
import { LoginUserDto } from './dtos/login-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly authService: AuthService) { }

  async loginUser(loginUserDTO: LoginUserDto): Promise<object> {

    if (!loginUserDTO.email || !loginUserDTO.password) {

      return {
        message: 'Email and password are required',
      };
    }

    const user = await this.prisma.user.findFirst({
      where: {
        email: loginUserDTO.email,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const isPasswordValid = await this.authService.comparePasswords(loginUserDTO.password, user.password);

    if (!isPasswordValid) {
      return {
        message: 'Invalid password',
      };
    }

    const token = await this.authService.generateToken(user.email, user.id.toString());

    return {
      message: 'User logged in successfully',
      name: user.name,
      email: user.email,
      token: token,
    }

  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      }
    });
  }

  async createUser(createUserDTO: CreateUserDto): Promise<object> {

    const checkUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDTO.email,
      }
    });

    if (checkUser) {
      return {
        message: 'User already exists',
      }
    }

    const isPasswordStrong = isStrongPassword(createUserDTO.password);

    if (!isPasswordStrong) {
      return {
        message: 'Password is not strong',
      }
    }

    const password = await this.authService.hashPassword(createUserDTO.password);

    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDTO.name,
        email: createUserDTO.email,
        password: password,
      },
    });

    return newUser;
  }

  async deleteUser(id: string): Promise<object> {

    if (!id) {
      return {
        message: 'ID is required',
      }
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(id),
      }
    })

    if (!user) {
      return {
        message: 'User not found',
      }
    }

    await this.prisma.user.delete({
      where: {
        id: parseInt(id),
      }
    })

    return {
      message: 'User deleted successfully',
      name: user.name,
    }

  }
}