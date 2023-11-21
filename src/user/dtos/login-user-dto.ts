import { IsBoolean, IsEmail } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsBoolean()
    stayLogged: boolean;
}
