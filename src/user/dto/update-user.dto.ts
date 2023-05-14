import { IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'The name filed must be a string.' })
  name: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;
}
