import { Module } from '@nestjs/common';
import { AgentesService } from './agentes.service';
import { AgentesController } from './agentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agente } from './entities/agente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agente])],
  controllers: [AgentesController],
  providers: [AgentesService],
})
export class AgentesModule {}
