import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { LoginUserDto } from './dtos/login-user-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    getUsers(): object {
        return this.userService.getUsers();
    }

    @Get(':email')
    findOne(@Param('email') email: string): object {
        return this.userService.findOne(email);
    }

    @Post()
    loginUser(@Body() loginUserDto: LoginUserDto): object {
        return this.userService.loginUser(loginUserDto);
    }

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): object {
        return this.userService.createUser(createUserDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string): object {
        return this.userService.deleteUser(id);
    }
}
