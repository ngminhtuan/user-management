import { IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UpdateUserDto {
    id: number;
    username?: string;
    password: string;
}