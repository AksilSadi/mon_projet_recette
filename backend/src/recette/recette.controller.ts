import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RecetteService } from './recette.service';
import { Recette } from './recette.entity';

@Controller('recettes')
export class RecetteController {
  constructor(private readonly service: RecetteService) {}

  @Get()
  findAll(): Promise<Recette[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recette | null> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() recette: Partial<Recette>): Promise<Recette> {
    return this.service.create(recette);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Recette>): Promise<Recette> {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(+id);
  }
}
