import { IsNotEmpty, IsString } from 'class-validator';

export class SinginDto {
  @IsNotEmpty({ message: 'The password field cannot be empty.' })
  @IsString({ message: 'The password field must be a string.' })
  readonly email: string;

  @IsNotEmpty({ message: 'The password field cannot be empty' })
  @IsString({ message: 'The password field must be a string.' })
  readonly password: string;
}
