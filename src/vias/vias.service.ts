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
) {}

  async create(createViaDto: CreateViaDto): Promise<Via> {
    try{
      const viaExistente = await this.viaRepository.findOne({where: { numero: createViaDto.numero }});

      if(viaExistente){
        throw new ConflictException(`La vía con el número ${createViaDto.numero} ya existe`);
      }

      const nuevaVia = await this.viaRepository.create(createViaDto);
      return await this.viaRepository.save(nuevaVia);
    }catch(error){
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

  async findAllVias() {
    return await this.viaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} via`;
  }

  update(id: number, updateViaDto: UpdateViaDto) {
    return `This action updates a #${id} via`;
  }

  remove(id: number) {
    return `This action removes a #${id} via`;
  }
}
