import { $Enums } from "@prisma/client";
import { IsDecimal, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCardDto {
   
    @IsString()
    @IsNotEmpty()
    thumb: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    weight: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    validity: string;

    @IsString()
    @IsNotEmpty()
    purchaseDate: string;

    @IsString()
    @IsNotEmpty()
    amount: string;

    state: $Enums.State;

}
