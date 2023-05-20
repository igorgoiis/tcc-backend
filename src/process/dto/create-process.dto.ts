import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProcessDto {
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  @IsString({ message: 'The name filed must be a string.' })
  name: string;

  @IsNotEmpty({ message: 'The observation field cannot be empty.' })
  @IsString({ message: 'The observation filed must be a string.' })
  observation: string;
}
