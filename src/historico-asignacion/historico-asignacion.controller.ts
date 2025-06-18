import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HistoricoAsignacionService } from './historico-asignacion.service';
import { CreateHistoricoAsignacionDto } from './dto/create-historico-asignacion.dto';
import { UpdateHistoricoAsignacionDto } from './dto/update-historico-asignacion.dto';

@Controller('historico-asignacion')
export class HistoricoAsignacionController {
  constructor(private readonly historicoAsignacionService: HistoricoAsignacionService) {}

  @Post()
  create(@Body() createHistoricoAsignacionDto: CreateHistoricoAsignacionDto) {
    return this.historicoAsignacionService.create(createHistoricoAsignacionDto);
  }

  @Get()
  async findAllPaginatedHistoricos(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10, //los querys leen los parametros y si no se envian, toma lo que están por defecto en la funcion del servicio
  ) {
    return await this.historicoAsignacionService.findAllPaginated(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicoAsignacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoricoAsignacionDto: UpdateHistoricoAsignacionDto) {
    return this.historicoAsignacionService.update(+id, updateHistoricoAsignacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historicoAsignacionService.remove(+id);
  }
}
