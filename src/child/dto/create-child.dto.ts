import { IsBoolean, IsString } from "class-validator";

export class CreateChildDto {
    @IsString()
    name: string;
    @IsString()
    adress: string;
    @IsBoolean()
    good: boolean;
}
