import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateHistoricoAsignacionDto {
    @IsOptional()
    @IsDateString({ strict: true }, { message: 'La fecha debe tener formato ISO 8601 (ejemplo: 2024-06-18T15:50:00.000Z).' })
    fechaAsignacion?: string; // Opcional, el backend puede colocar new Date() si no viene

    @IsString()
    @IsNotEmpty({ message: 'El usuario asignador es requerido.' })
    usuarioAsignador: string;

    @IsUUID('4', { message: 'El id del agente debe ser un UUID válido.' })
    @IsNotEmpty({ message: 'El id del agente es requerido.' })
    idAgente: string;

    @IsUUID('4', { message: 'El id de la vía debe ser un UUID válido.' })
    @IsNotEmpty({ message: 'El id de la vía es requerido.' })
    idVia: string;
}
