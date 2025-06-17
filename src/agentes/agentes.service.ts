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
import { agent } from 'supertest';

@Injectable()
export class AgentesService {
  constructor(
    @InjectRepository(Agente)
    private readonly agenteRepository: Repository<Agente>,

    @InjectRepository(Via)
    private readonly viaRepository: Repository<Via>,
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

    const agenteEncontrado = await this.agenteRepository.findOneBy({ id });

    try {
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
    try{
      const agenteEncontrado = await this.agenteRepository.findOneBy({id})
      if (!agenteEncontrado) {
        throw new NotFoundException(`Agente con ID ${id} no encontrado`);
      }else{
        //actualizamos los campos del agente
        Object.assign(agenteEncontrado, updateAgenteDto);

        //si se proporciona via actual, manejar la relacon
        if (updateAgenteDto.idViaActual) {
          //cargamos la entidad para verificar que exista y tener el objeto por si necesita mas adelante
          const viaExistente = await this.viaRepository.findOne({
            where: { id: updateAgenteDto.idViaActual },
          });
          if (!viaExistente) {
            //si la via no existe se lanza una excepcion
            throw new NotFoundException(`La via seleccionada no existe`);
          }
          agenteEncontrado.viaActual = viaExistente; // si existe, se asignda
        } else {
          agenteEncontrado.viaActual = null; // si no se proporciona, se quita la relacion
        }

        return await this.agenteRepository.save(agenteEncontrado);
      }
    }catch (error) {
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
