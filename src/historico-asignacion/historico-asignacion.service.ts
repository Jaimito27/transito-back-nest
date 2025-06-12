import { Injectable } from '@nestjs/common';
import { CreateHistoricoAsignacionDto } from './dto/create-historico-asignacion.dto';
import { UpdateHistoricoAsignacionDto } from './dto/update-historico-asignacion.dto';

@Injectable()
export class HistoricoAsignacionService {
  create(createHistoricoAsignacionDto: CreateHistoricoAsignacionDto) {
    return 'This action adds a new historicoAsignacion';
  }

  findAll() {
    return `This action returns all historicoAsignacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historicoAsignacion`;
  }

  update(id: number, updateHistoricoAsignacionDto: UpdateHistoricoAsignacionDto) {
    return `This action updates a #${id} historicoAsignacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} historicoAsignacion`;
  }
}
