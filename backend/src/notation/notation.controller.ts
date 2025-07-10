import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { NotationService } from './notation.service';
import { Notation } from './notation.entity';

@Controller('notation')
export class NotationController {
  constructor(private readonly service: NotationService) {}

  @Post()
  rate(@Body() data: Partial<Notation>): Promise<Notation> {
    return this.service.rate(data);
  }

  @Get('recette/:id')
  getByRecette(@Param('id') id: string): Promise<Notation[]> {
    return this.service.findByRecette(+id);
  }

  @Get('recette/:id/average')
  async getAverage(@Param('id') id: string): Promise<{ average: number }> {
    const avg = await this.service.averageByRecette(+id);
    return { average: avg };
  }
}
