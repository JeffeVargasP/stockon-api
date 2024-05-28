import { HttpException, Injectable, Response } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import User from './user.interface';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    if (!users) {
      throw new HttpException('Users not found', 404);
    }

    return users;
  }

  async findByEmail(email: string): Promise<User> {

    if (!email) {
      throw new HttpException('Email is required', 400);
    }

    const userFound = await this.prisma.user.findFirst({
      where: { email }
    });

    if (!userFound) {
      throw new HttpException('User not found', 404);
    }

    return userFound;
  }

  async findOne(id: string): Promise<User> {

    if (!id) {
      throw new HttpException('ID is required', 400);
    }

    const userFound = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!userFound) {
      throw new HttpException('User not found', 404);
    }

    return userFound;

  }

  async create(createUserDto: CreateUserDto): Promise<object> {

    const checkUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      }
    });

    if (checkUser) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.ROUNDSOFHASHING),
    )

    createUserDto.password = hashedPassword;

    await this.prisma.user.create({
      data: createUserDto,
    });

    return {
      message: 'User created successfully'
    }

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    updateUserDto.bornDate = new Date(updateUserDto.bornDate).toISOString();

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        parseInt(process.env.ROUNDSOFHASHING),
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<object> {

    if (!id) {
      return {
        message: 'ID is required',
      }
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      }
    })

    if (!user) {
      return {
        message: 'User not found',
      }
    }

    await this.prisma.user.delete({
      where: {
        id: id,
      }
    })

    return {
      message: 'User deleted successfully',
      name: user.name,
    }

  }

}