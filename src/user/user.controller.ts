import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('login')
    loginUser(@Body('email') email: string): object {
        return this.userService.loginUser(email);
    }

    @Get(':email')
    getUser(@Param('email') email: string): object {
        return this.userService.findUserByEmail(email);
    }

    @Patch('/login/:stayLoggedKey')
    stayLogged(@Param('stayLoggedKey') stayLoggedKey: string): object {
        return this.userService.stayLogged(stayLoggedKey);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): object {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':activationKey')
    activeUser(@Param('activationKey') activationKey: string): object {
        return this.userService.activeUser(activationKey);
    }

    @Delete(':deleteKey')
    deleteUser(@Param('deleteKey') deleteKey: string): object {
        return this.userService.deleteUser(deleteKey);
    }
}
