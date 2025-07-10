import { Module } from '@nestjs/common';
import { RecetteIngredientService } from './recette-ingredient.service';
import { RecetteIngredientController } from './recette-ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetteIngredient } from './recette-ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecetteIngredient])],
  providers: [RecetteIngredientService],
  controllers: [RecetteIngredientController],
  exports: [RecetteIngredientService],
})
export class RecetteIngredientModule {}
