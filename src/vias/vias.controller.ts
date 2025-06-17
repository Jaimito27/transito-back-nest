import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViasService } from './vias.service';
import { CreateViaDto } from './dto/create-via.dto';
import { UpdateViaDto } from './dto/update-via.dto';

@Controller('vias')
export class ViasController {
  constructor(private readonly viasService: ViasService) {}

  @Post()
  create(@Body() createViaDto: CreateViaDto) {
    return this.viasService.create(createViaDto);
  }

  @Get()
  findAll() {
    return this.viasService.findAllVias();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViaDto: UpdateViaDto) {
    return this.viasService.update(+id, updateViaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viasService.remove(+id);
  }
}
