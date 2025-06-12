import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAgenteDto } from './dto/create-agente.dto';
import { UpdateAgenteDto } from './dto/update-agente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agente } from './entities/agente.entity';
import { Repository } from 'typeorm';
import { Via } from 'src/vias/entities/via.entity';

@Injectable()
export class AgentesService {
  constructor(
    @InjectRepository(Agente)
    private readonly agenteRepository: Repository<Agente>,

    @InjectRepository(Via)
    private readonly viaRepository: Repository<Via>,
  ) {}

  async create(createAgenteDto: CreateAgenteDto): Promise<Agente> {
    try {
      const agente = this.agenteRepository.create(createAgenteDto);

      //si se proporciona via actual, manejar la relacon
      if (createAgenteDto.idViaActual) {
        //cargamos la entidad para verificar que exista y tener el objeto por si necesita mas adelante
        const viaExistente = await this.viaRepository.findOne({
          where: { id: createAgenteDto.idViaActual },
        });
        if (!viaExistente) {
          //si la via no existe se lanza una excepcion
          throw new NotFoundException(`La via seleccionada no existe`);
        }
        agente.viaActual = viaExistente; // si existe, se asignda
      }

      return await this.agenteRepository.save(agente);
    } catch (error) {
      if (error.errno === 1062) {
        //error de mysql sobre duplicidad
        throw new ConflictException(
          `El código de agente ${createAgenteDto.codigo} ya existe`,
        );
      }

      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      console.error('Error inesperado al crear agente:', error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al crear el agente.',
      );
    }
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
