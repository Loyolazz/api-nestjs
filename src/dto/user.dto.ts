import {IsEmail, IsString, Length, MaxLength, MinLength} from "class-validator";

export class LoginDto {

    @IsString()
    @Length(5, 12)
    username: string;

    @IsString()
    @Length(5, 12)
    password: string;
}

export class RegisterDto {
    @IsString()
    @Length(5, 12)
    @MaxLength(100)
    name: string;

    @IsString()
    @Length(5, 12)
    @MaxLength(100)
    username: string;

    @IsString()
    @Length(6, 12)
    @MinLength(8)
    @MaxLength(100)
    password: string;

    @IsEmail()
    @IsString()
    @MaxLength(100)
    email: string;

}