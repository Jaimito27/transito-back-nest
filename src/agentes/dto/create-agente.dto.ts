import { Type } from 'class-transformer';
import {
    IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateAgenteDto {
  @IsString()
  @IsNotEmpty()
  nombreCompleto: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]{3,10}$/, {
    message:
      'El código debe ser alfanumérico, entre 3 y 10 caracteres, y en mayúsculas.',
  })
  codigo: string;

  @IsOptional()
  @IsString()
  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Años de experiencia debe ser un número decimal con hasta 2 decimales.' })
  anosExperiencia?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty() //si esta presente no puede estar vacío
  codigoSecretariaTransito?: string;

  @IsOptional()
  @IsUUID('4')
  idViaActual?: string;
}
