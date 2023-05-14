import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  @IsString({ message: 'The name filed must be a string.' })
  name: string;

  @IsNotEmpty({ message: 'The email field cannot be empty.' })
  @IsEmail({}, { message: 'The email field must be a valid email.' })
  @IsString({ message: 'The email filed must be a string.' })
  email: string;

  @IsNotEmpty({ message: 'The password field cannot be empty.' })
  @IsString({ message: 'The password filed must be a string.' })
  @MinLength(4, { message: 'The password must have at least 6 characters.' })
  password: string;
}
