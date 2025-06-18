import { Module } from '@nestjs/common';
import { HistoricoAsignacionService } from './historico-asignacion.service';
import { HistoricoAsignacionController } from './historico-asignacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoAsignacion } from './entities/historico-asignacion.entity';
import { Agente } from 'src/agentes/entities/agente.entity';
import { Via } from 'src/vias/entities/via.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricoAsignacion, Agente, Via])],
  controllers: [HistoricoAsignacionController],
  providers: [HistoricoAsignacionService],
})
export class HistoricoAsignacionModule {}
