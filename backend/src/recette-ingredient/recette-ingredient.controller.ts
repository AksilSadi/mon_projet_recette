import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RecetteIngredientService } from './recette-ingredient.service';
import { RecetteIngredient } from './recette-ingredient.entity';

@Controller('recette-ingredient')
export class RecetteIngredientController {
  constructor(private readonly service: RecetteIngredientService) {}

  @Post()
  create(@Body() data: Partial<RecetteIngredient>): Promise<RecetteIngredient> {
    return this.service.create(data);
  }

  @Get('recette/:id')
  findByRecette(@Param('id') id: string): Promise<RecetteIngredient[]> {
    return this.service.findByRecetteId(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<RecetteIngredient>,
  ): Promise<RecetteIngredient> {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(+id);
  }
}
