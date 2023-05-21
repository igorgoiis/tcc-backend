import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateActivityDto {
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  @IsString({ message: 'The name filed must be a string.' })
  name: string;

  @IsNotEmpty({ message: 'The valor field cannot be empty.' })
  @IsString({ message: 'The valor filed must be a string.' })
  valor: string;

  @IsNotEmpty({ message: 'The ordem field cannot be empty.' })
  @IsString({ message: 'The ordem filed must be a string.' })
  ordem: string;

  @IsNotEmpty({ message: 'The espacial field cannot be empty.' })
  @IsString({ message: 'The espacial filed must be a string.' })
  espacial: string;

  @IsNotEmpty({ message: 'The temporal field cannot be empty.' })
  @IsString({ message: 'The temporal filed must be a string.' })
  temporal: string;

  @IsNotEmpty({ message: 'The dinamica field cannot be empty.' })
  @IsString({ message: 'The dinamica filed must be a string.' })
  dinamica: string;

  @IsNotEmpty({ message: 'The plastica field cannot be empty.' })
  @IsString({ message: 'The plastica filed must be a string.' })
  plastica: string;

  @IsNotEmpty({ message: 'The cumulatividade field cannot be empty.' })
  @IsString({ message: 'The cumulatividade filed must be a string.' })
  cumulatividade: string;

  @IsNotEmpty({ message: 'The magnitude field cannot be empty.' })
  @IsString({ message: 'The magnitude filed must be a string.' })
  magnitude: string;

  @IsNotEmpty({ message: 'The significancia field cannot be empty.' })
  @IsString({ message: 'The significancia filed must be a string.' })
  significancia: string;

  @IsNotEmpty({ message: 'The sensibilidade field cannot be empty.' })
  @IsString({ message: 'The sensibilidade filed must be a string.' })
  sensibilidade: string;

  @IsNotEmpty({ message: 'The condicoes field cannot be empty.' })
  @IsString({ message: 'The condicoes filed must be a string.' })
  condicoes: string;

  @IsNotEmpty({ message: 'The resistencia field cannot be empty.' })
  @IsString({ message: 'The resistencia filed must be a string.' })
  resistencia: string;
}
