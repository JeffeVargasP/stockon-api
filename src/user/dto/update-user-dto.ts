import { IsDate, IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsString({message: 'Name is required'})
    name: string;

    @IsEmail({},{message: 'Email is required'})
    email: string;

    @IsString({message: 'Password is required'})
    @IsStrongPassword({}, {message: 'Password is too weak'})
    @MinLength(6, {message: 'Password is too short'})
    password: string;

    @IsString({message: 'Biography is required'})
    biography: string;

    @IsString({message: 'Born date is required'})
    bornDate: string;

    @IsString({message: 'Profile photo is required'})
    profilePhoto: string;

}
