import { $Enums } from "@prisma/client";
import { IsDecimal, IsEmail, IsInt, IsNumber, IsString } from "class-validator";

export class CreateCardDto {
   
    @IsString()
    thumb: string;

    @IsString()
    name: string;

    @IsString()
    brand: string;

    @IsString()
    weight: string;

    @IsString()
    color: string;

    @IsString()
    model: string;

    @IsString()
    validity: string;

    @IsString()
    amount: string;

    state: $Enums.State;

}
