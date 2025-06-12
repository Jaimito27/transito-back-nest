import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  Min,
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
  @Type(() => Number)
  @IsNumber({}, { message: 'Años de experiencia debe ser un número' })
  @Min(0, { message: 'Años de experencia no puede ser negativo' })
  @Max(999.99, { message: 'Años de experiencia no puede exceder 999.99' })
  anosExperiencia?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty() //si esta presente no puede estar vacío
  codigoSecretariaTransito?: string;

  @IsOptional()
  @IsUUID('4', { message: 'Debe ser un codigo de via válido' })
  viaActual?: string;
}
