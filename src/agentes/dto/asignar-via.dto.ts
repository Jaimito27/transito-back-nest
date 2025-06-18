import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { CreateHistoricoAsignacionDto } from "src/historico-asignacion/dto/create-historico-asignacion.dto";

export class AsignarViaDto extends PartialType(CreateHistoricoAsignacionDto){
    @IsString()

    usuarioAsignador?: string;

    @IsUUID('4', { message: 'El id del agente debe ser un UUID válido.' })
    @IsNotEmpty({ message: 'El id del agente es requerido.' })
    idAgente: string;

    @IsUUID('4', { message: 'El id de la vía debe ser un UUID válido.' })
    @IsNotEmpty({ message: 'El id de la vía es requerido.' })
    idVia: string;
}