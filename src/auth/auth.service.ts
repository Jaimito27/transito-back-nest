import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService
  ) { }


  async validateUser(username: string, password: string): Promise<any> {
    try {
      const usuario = await this.usuarioService.findByUsername(username);
      if (usuario && await bcrypt.compare(password, usuario.password)) {
        const { password, ...resultado } = usuario; // Remueve el password del objeto retornado
        return resultado;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException("Ha ocurrido un error", error)
    }
  }
  //retorna el acceso token

  // 2. Genera el JWT al hacer login exitoso
  async login(usuario: any) {
    try {
      const payload = {
        username: usuario.username,
        password: usuario.password,
        sub: usuario.id,
        rol: usuario.rol
      }
      return { access_token: this.jwtService.sign(payload) }
    } catch (error) {
      throw new InternalServerErrorException("Ha ocurrido un error", error)
    }
  }

  async registrarUsuario(createUsuarioDTO: CreateUsuarioDto): Promise<Usuario> {
    try {
      const usuarioExistente = await this.usuarioService.findByUsername(createUsuarioDTO.username);
      if (usuarioExistente) throw new BadRequestException("El ususario ya existe")

      const hashedPassword = await bcrypt.hash(createUsuarioDTO.password, 10)
      const usuario = await this.usuarioService.create({
        ...createUsuarioDTO,
        password: hashedPassword,
      })

      const { password, ...result } = usuario;
      return result as Usuario
    } catch (error) {
      throw new InternalServerErrorException("Ha ocurrido un error", error)
    }
  }
}
