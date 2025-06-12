import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoricoAsignacionDto } from './create-historico-asignacion.dto';

export class UpdateHistoricoAsignacionDto extends PartialType(CreateHistoricoAsignacionDto) {}
