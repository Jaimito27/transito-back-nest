import { Module } from '@nestjs/common';
import { AgentesService } from './agentes.service';
import { AgentesController } from './agentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agente } from './entities/agente.entity';
import { Via } from 'src/vias/entities/via.entity';
import { HistoricoAsignacion } from 'src/historico-asignacion/entities/historico-asignacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agente, Via, HistoricoAsignacion])],
  controllers: [AgentesController],
  providers: [AgentesService],
})
export class AgentesModule {}
