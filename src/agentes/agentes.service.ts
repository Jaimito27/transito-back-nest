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
import { ObjectId, Repository } from 'typeorm';
import { Via } from 'src/vias/entities/via.entity';
import { agent } from 'supertest';
import { HistoricoAsignacion } from 'src/historico-asignacion/entities/historico-asignacion.entity';

@Injectable()
export class AgentesService {
  constructor(
    @InjectRepository(Agente)
    private readonly agenteRepository: Repository<Agente>,

    @InjectRepository(Via)
    private readonly viaRepository: Repository<Via>,

    @InjectRepository(HistoricoAsignacion)
    private readonly historicoRepository: Repository<HistoricoAsignacion>
  ) { }

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

      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al crear el agente.',
      );
    }
  }

  async findAllAgentes() {
    return await this.agenteRepository.find();
  }

  async findOne(id: string) {
    try {
      const agenteEncontrado = await this.agenteRepository.findOneBy({ id });
      if (!agenteEncontrado) {
        throw new NotFoundException(`Agente con ID ${id} no encontrado`);
      }
      return await agenteEncontrado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error inesperado al buscar agente:', error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al buscar el agente.',
      );
    }
  }

  async update(id: string, updateAgenteDto: UpdateAgenteDto) {
    try {
      const agenteEncontrado = await this.agenteRepository.findOneBy({ id })
      if (!agenteEncontrado) {
        throw new NotFoundException(`Agente con ID ${id} no encontrado`);
      }

      const { idViaActual, ...restoCampos } = updateAgenteDto; //extrae la via del resto de datos
      Object.assign(agenteEncontrado, restoCampos)
      return await this.agenteRepository.save(agenteEncontrado)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error inesperado al actualizar agente:', error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al actualizar el agente.',
      );
    }
  }

  async asignarViaAgente(idVia: string, idAgente: string, usuarioAsignador: string) {
    try {
      const agente = await this.agenteRepository.findOne({ where: { id: idAgente }, relations: ['viaActual'] })
      if (!agente) {
        throw new NotFoundException("Agente no encontrado")
      }

      const nuevaVia = await this.viaRepository.findOne({ where: { id: idVia } })
      if (!nuevaVia) {
        throw new NotFoundException("Via no encontrada")
      }
      // se asigna al historico
      await this.historicoRepository.save({
        fechaAsignacion: new Date(),
        usuarioAsignador,
        agenteTransito: agente,
        viaAsignada: nuevaVia
      })

      //actualizar la via

      agente.viaActual = nuevaVia
      return await this.agenteRepository.save(agente)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error inesperado al actualizar agente:', error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al actualizar el agente.',
      );
    }
  }

  async remove(id: string) {

    try {
      const agenteEncontrado = await this.agenteRepository.findOneBy({ id });
      if (!agenteEncontrado) {
        throw new NotFoundException(`Agente con ID ${id} no encontrado`);
      }

      if (agenteEncontrado.viaActual) {
        //quitar la relacion de la via que tenga asignada en el momento
        agenteEncontrado.viaActual = null;
        //em cambio persiste
        await this.agenteRepository.save(agenteEncontrado)
      }

      await this.agenteRepository.softRemove(agenteEncontrado); //softRemove marca el agente como eliminado sin borrarlo físicamente de la base de datos

      return { message: `Agente con ID ${id} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error inesperado al eliminar agente:', error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al eliminar el agente.',
      );
    }
  }
}
