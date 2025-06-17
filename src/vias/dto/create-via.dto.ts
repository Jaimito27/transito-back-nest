import { IsNotEmpty, IsNumber, IsString, Matches, Max, Min } from "class-validator";

export class CreateViaDto {
    @IsString({ message: 'El tipo debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El tipo no puede estar vacío.' })
    tipo: string;

    @IsString({ message: 'La calle o carrera debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La calle o carrera no puede estar vacía.' })
    esCalleOCarrera: string;

    @IsNumber({}, { message: 'El número debe ser un número.' })
    @IsNotEmpty({ message: 'El número no puede estar vacío.' })
    @Min(1, { message: 'El número debe ser mayor o igual a 1.' })
    @Max(999, { message: 'El número debe ser menor o igual a 999.' })
    numero: number;

    @IsString({ message: 'El nivel de congestión debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nivel de congestión no puede estar vacío.' })
    @Matches(/^\d{1,3}(\.\d{1,2})?$/, { // Permite hasta 3 dígitos enteros y hasta 2 decimales (ej. "123.45", "5.0", "100")
        message: 'El nivel de congestión debe ser un número decimal con hasta 2 decimales y un máximo de 3 dígitos enteros (ej. "12.34", "5.00").',
    })
    nivelCongestion: string;
}
