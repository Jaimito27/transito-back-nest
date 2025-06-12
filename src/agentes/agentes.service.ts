import { Injectable } from '@nestjs/common';
import { CreateAgenteDto } from './dto/create-agente.dto';
import { UpdateAgenteDto } from './dto/update-agente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agente } from './entities/agente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgentesService {
  constructor(
    @InjectRepository(Agente)
    private readonly agenteRepository: Repository<Agente>,
  ) {}

  async create(createAgenteDto: CreateAgenteDto) {
    return await ;
  }

  async findAllAgentes() {
    return await this.agenteRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} agente`;
  }

  update(id: number, updateAgenteDto: UpdateAgenteDto) {
    return `This action updates a #${id} agente`;
  }

  remove(id: number) {
    return `This action removes a #${id} agente`;
  }
}
