import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.historicoAsignacionService.findAll();
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
