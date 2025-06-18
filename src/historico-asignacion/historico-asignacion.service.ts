import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateHistoricoAsignacionDto } from './dto/create-historico-asignacion.dto';
import { UpdateHistoricoAsignacionDto } from './dto/update-historico-asignacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoricoAsignacion } from './entities/historico-asignacion.entity';
import { Repository } from 'typeorm';
import { Agente } from 'src/agentes/entities/agente.entity';
import { Via } from 'src/vias/entities/via.entity';

@Injectable()
export class HistoricoAsignacionService {

  constructor(
    @InjectRepository(HistoricoAsignacion)
    private readonly historicoAsignacionRepository: Repository<HistoricoAsignacion>,

    @InjectRepository(Agente)
    private readonly agenteRepository: Repository<Agente>,

    @InjectRepository(Via)
    private readonly viaRepository: Repository<Via>
  ) { }

  async create(createHistoricoAsignacionDto: CreateHistoricoAsignacionDto): Promise<HistoricoAsignacion> {
    try {
      const agenteEncontrado = await this.agenteRepository.findOne({ where: { id: createHistoricoAsignacionDto.idAgente } })
      const viaEncontrada = await this.viaRepository.findOne({ where: { id: createHistoricoAsignacionDto.idVia } })

      if (!agenteEncontrado) {
        throw new NotFoundException("No fue encontrado el agente seleccionado")
      }
      if (!viaEncontrada) {
        throw new NotFoundException("No fue encontrada la via seleccionada")
      }
      const historico = await this.historicoAsignacionRepository.create({
        fechaAsignacion: createHistoricoAsignacionDto.fechaAsignacion ? new Date(createHistoricoAsignacionDto.fechaAsignacion) : new Date(),
        usuarioAsignador: createHistoricoAsignacionDto.usuarioAsignador,
        agenteTransito: agenteEncontrado,
        viaAsignada: viaEncontrada,
      });

      return await this.historicoAsignacionRepository.save(historico)
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Ocurrió un error al crear el histórico');
    }
  }

  async findAllPaginated(page = 1, limit = 10) {
    const [results, total] = await this.historicoAsignacionRepository.findAndCount({ //esta fucnion tare como resultados, la data y el # total de registros
      relations: ['agenteTransito', 'viaAsignada'], //relaciones
      skip: (page - 1) * limit, //salta los registros de la apgina anterior, es decir, si estoy en la pagina 3, me tare los registro del 20 en adelante, dado que el lmite es 10
      take: limit, //cuantos registros traer
      order: {fechaAsignacion: 'DESC'} //segun fecha de asignación trae el mas reciente
    });

    return{
      data: results,
      total,
      page,
      lastPage: Math.ceil(total/limit),
    }
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
