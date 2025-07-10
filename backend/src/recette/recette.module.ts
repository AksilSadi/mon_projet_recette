import { Module } from '@nestjs/common';
import { RecetteService } from './recette.service';
import { RecetteController } from './recette.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recette } from './recette.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recette])],
  providers: [RecetteService],
  controllers: [RecetteController],
  exports: [RecetteService],
})
export class RecetteModule {}
