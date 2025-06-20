import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { PaginatedUsuarios } from './interfaces/paginated-usuarios.interface';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  //no tiene validaciones aca porque como será usuado por auth service entonces allí se hacen las validaciones
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.create(createUsuarioDto)
      return await this.usuarioRepository.save(usuario)
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error al obtener los agentes paginado.', error
      );
    }
  }

  async findAllUsuarios(page = 1, limit = 10): Promise<PaginatedUsuarios> {
    try {
      const [results, total] = await this.usuarioRepository.findAndCount({
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
throw new InternalServerErrorException("Ha ocurrido un error", error)
    }
  }

  async findOne(id: string): Promise<Usuario | null> {
    try {
      return await this.usuarioRepository.findOneBy({ id })
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error', error
      );
    }
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ id });
      if (!usuario) throw new NotFoundException("Usuario no encontrado")
      Object.assign(usuario, updateUsuarioDto)
      return await this.usuarioRepository.save(usuario)
    } catch (error) {
      throw new InternalServerErrorException('Ha ocurrido un error', error)
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ id })
      if (!usuario) throw new NotFoundException("Usuario no encontrado")

      await this.usuarioRepository.softRemove(usuario)
      return { message: `Usuario ${usuario.nombre} ${usuario.apellido} ha sido eliminado correctamente` }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Ha ocurrido un error ', error
      );
    }
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    try {
      return await this.usuarioRepository.findOne({
        where: { username }
      })
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error', error
      );
    }
  }
}
