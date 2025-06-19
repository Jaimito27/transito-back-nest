import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService
  ){}


  async validateUser(username: string, password: string): Promise<any>{
    const usuario = await this.usuarioService.findByUsername(username);
    if(usuario && await bcrypt.compare)(password, usuario.password){
      const {password, ...resultado} = usuario; // Remueve el password del objeto retornado
      return resultado;
    }
    return null;
  }
//retorna el acceso token

// 2. Genera el JWT al hacer login exitoso
  async login(usuario: any){
    const payload = {
      username: usuario.username,
      password: usuario.password,
      sub: usuario.id,
      rol: usuario.rol
    }
    return{access_token: this.jwtService.sign(payload)}
  }
}
