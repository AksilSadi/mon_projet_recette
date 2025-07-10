import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './ingredient.entity';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly service: IngredientService) {}

  @Get()
  findAll(): Promise<Ingredient[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ingredient | null> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() ingredient: Partial<Ingredient>): Promise<Ingredient> {
    return this.service.create(ingredient);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Ingredient>): Promise<Ingredient> {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(+id);
  }
}
