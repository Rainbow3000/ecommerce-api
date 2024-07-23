import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
