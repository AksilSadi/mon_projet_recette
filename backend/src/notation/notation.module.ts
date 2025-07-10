import { Module } from '@nestjs/common';
import { NotationService } from './notation.service';
import { NotationController } from './notation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notation } from './notation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notation])],
  providers: [NotationService],
  controllers: [NotationController],
  exports: [NotationService],
})
export class NotationModule {}
