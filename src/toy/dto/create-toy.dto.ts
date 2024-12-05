import {IsNumber, IsPositive, IsString } from "class-validator";

export class CreateToyDto {
    @IsString()
    name: string;
    @IsString()
    material: string;
    @IsNumber()
    @IsPositive()
    weight: number;
}
