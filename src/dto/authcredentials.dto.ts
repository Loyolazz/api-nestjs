import { IsString, IsNotEmpty, Length } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @Length(5, 12)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 12)
    password: string;
}
