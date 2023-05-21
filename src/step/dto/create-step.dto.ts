import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStepDto {
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  @IsString({ message: 'The name filed must be a string.' })
  name: string;

  @IsNotEmpty({ message: 'The observation field cannot be empty.' })
  @IsString({ message: 'The observation filed must be a string.' })
  observation: string;

  @IsNotEmpty({ message: 'The process_id field cannot be empty.' })
  @IsNumber({}, { message: 'The process_id filed must be a number.' })
  process_id: number;
}
