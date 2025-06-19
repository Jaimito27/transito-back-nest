import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('registrar')
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.authService.registrarUsuario(createUsuarioDto)
    const {password, ...resultado} = usuario
    
    return {
      message: "Usuario creado exitosamente",
      usuario: resultado
    };
  }


  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) { throw new UnauthorizedException("Usuario o contraseña incorrectos") };
    return this.authService.login(user);
  }


}
