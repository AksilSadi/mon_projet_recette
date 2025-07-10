import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favoris } from './favoris.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favoris])],
  providers: [FavorisService],
  controllers: [FavorisController],
  exports: [FavorisService],
})
export class FavorisModule {}
