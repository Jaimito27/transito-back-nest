import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException } from '@nestjs/common';
import { AgentesService } from './agentes.service';
import { CreateAgenteDto } from './dto/create-agente.dto';
import { UpdateAgenteDto } from './dto/update-agente.dto';
import { AsignarViaDto } from './dto/asignar-via.dto';

@Controller('agentes')
export class AgentesController {
  constructor(private readonly agentesService: AgentesService) {}

  @Post()
  create(@Body() createAgenteDto: CreateAgenteDto) {
    return this.agentesService.create(createAgenteDto);
  }

  @Get()
  findAll() {
    return this.agentesService.findAllAgentes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentesService.findOne(id);
  }

@Patch('asignar-via')
async asignarVia(
@Body() dto: AsignarViaDto,
  @Request() req //asumiendo que hay un auth y se puede sacaer el usuario logueado
){
  const usuarioAsignador = dto.usuarioAsignador || req.user?.username || 'Sistema';

  return await this.agentesService.asignarViaAgente(dto.idVia, dto.idAgente, usuarioAsignador)
}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgenteDto: UpdateAgenteDto) {
    return this.agentesService.update(id, updateAgenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentesService.remove(id);
  }
}
