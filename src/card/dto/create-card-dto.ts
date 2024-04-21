import { $Enums } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCardDto {
   
    @IsString()
    @IsOptional()
    thumb: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    brand: string;

    @IsString()
    @IsOptional()
    weight: string;

    @IsString()
    @IsOptional()
    color: string;

    @IsString()
    @IsOptional()
    validity: string;

    @IsString()
    @IsOptional()
    purchaseDate: string;

    @IsString()
    @IsOptional()
    amount: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    state: $Enums.State;

}
