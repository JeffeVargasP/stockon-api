import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString({message: 'Name is required'})
    name: string;

    @IsEmail({}, {message: 'Email is required'})
    @IsNotEmpty()
    email: string;

    @IsString({message: 'Password is required'})
    @IsNotEmpty()
    // @IsStrongPassword()
    @MinLength(6)
    password: string;

}
