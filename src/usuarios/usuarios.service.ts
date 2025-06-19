import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { RouteInfoPathExtractor } from '@nestjs/core/middleware/route-info-path-extractor';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRespository: Repository<Usuario>
  ) { }

  //no tiene validaciones aca porque como será usuado por auth service entonces allí se hacen las validaciones
  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  async findOne(id: string): Promise<Usuario | null> {
    try {
      return await this.usuarioRespository.findOneBy({ id })
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error al obtener los agentes paginado.', error
      );
    }
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    try {
      return await this.usuarioRespository.findOne({
        where: { username }
      })
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error al obtener los agentes paginado.', error
      );
    }
  }
}
