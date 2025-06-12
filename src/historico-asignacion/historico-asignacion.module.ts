import { Module } from '@nestjs/common';
import { HistoricoAsignacionService } from './historico-asignacion.service';
import { HistoricoAsignacionController } from './historico-asignacion.controller';

@Module({
  controllers: [HistoricoAsignacionController],
  providers: [HistoricoAsignacionService],
})
export class HistoricoAsignacionModule {}
