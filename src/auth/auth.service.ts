import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService
  ){}


  async validateUser(username: string, pass: string): Promise<any>{
    const usuario = await this.usuarioService.findByUsername(username);
    
  }
}
