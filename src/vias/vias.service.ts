import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateViaDto } from './dto/create-via.dto';
import { UpdateViaDto } from './dto/update-via.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Via } from './entities/via.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ViasService {
  constructor(
    @InjectRepository(Via)
    private readonly viaRepository: Repository<Via>,
  ) { }

  async create(createViaDto: CreateViaDto): Promise<Via> {
    try {
      const viaExistente = await this.viaRepository.findOne({ where: { numero: createViaDto.numero } });

      if (viaExistente) {
        throw new ConflictException(`La vía con el número ${createViaDto.numero} ya existe`);
      }

      const nuevaVia = await this.viaRepository.create(createViaDto);
      return await this.viaRepository.save(nuevaVia);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      // Loggear el error completo para depuración
      console.error('Error inesperado al crear la vía:', error);


      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new ConflictException(
          `Ya existe una vía con el mismo número. Detalles: ${error.message}`
        );
      }

      // Para cualquier otro error no manejado, lanzar una excepción genérica de servidor
      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al crear la vía.',
      );
    }
  }

  async findAllVias(page = 1, limit = 10) {
    try {
      const [results, total] = await this.viaRepository.findAndCount({
        skip: (page - 1) * limit, //salta los registros de la apgina anterior, es decir, si estoy en la pagina 3, me tare los registro del 20 en adelante, dado que el lmite es 10
        take: limit,
      })
      return {
        data: results,
        total,
        page,
        lastPage: Math.ceil(total / limit)
      }
    } catch (error) {
      console.error('Error al obtener los agentes paginados:', error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error al obtener los agentes paginado.'
      );
    }
  }

  async findOne(id: string) {

    try {
      const viaEncontrada = await this.viaRepository.findOneBy({ id })

      if (!viaEncontrada) {
        throw new NotFoundException("La via no fue encontrada")
      }
      return await viaEncontrada;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error inesperado al buscar via:', error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al buscar el via.',
      );
    }
  }

  async update(id: string, updateViaDto: UpdateViaDto) {
    try {
      const viaEncontrada = await this.viaRepository.findOneBy({ id })
      if (!viaEncontrada) {
        throw new NotFoundException("La via no fue encontrada, por ende no podrá editarse")
      }
      Object.assign(viaEncontrada, updateViaDto)

      return await this.viaRepository.save(viaEncontrada)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error inesperado al actualizar via:', error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al actualizar la via.',
      );
    }
  }

  async remove(id: string) {
    try {
      const viaEncontrada = await this.viaRepository.findOneBy({ id })
      if (!viaEncontrada) {
        throw new NotFoundException("La via no fue encontrada")
      }
      if (viaEncontrada.agentesTransito) {
        viaEncontrada.agentesTransito = null;
        await this.viaRepository.save(viaEncontrada)
      }
      await this.viaRepository.softRemove(viaEncontrada);

      return { message: `Via con ID ${id} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error inesperado al eliminar via:', error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error inesperado al eliminar el via.',
      );
    }
  }
}
