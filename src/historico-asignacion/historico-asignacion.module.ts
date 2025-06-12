import { Module } from '@nestjs/common';
import { HistoricoAsignacionService } from './historico-asignacion.service';
import { HistoricoAsignacionController } from './historico-asignacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoAsignacion } from './entities/historico-asignacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricoAsignacion])],
  controllers: [HistoricoAsignacionController],
  providers: [HistoricoAsignacionService],
})
export class HistoricoAsignacionModule {}
