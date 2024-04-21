import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import User from './user.interface';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      }
    });
  }

  async create(createUserDto: CreateUserDto): Promise<object> {

    const checkUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      }
    });

    if (checkUser) {
      return {
        message: 'User already exists',
      }
    }

    const hashedPassword = await await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.ROUNDSOFHASHING),
    )

    createUserDto.password = hashedPassword;

    await this.prisma.user.create({
      data: createUserDto,
    });

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