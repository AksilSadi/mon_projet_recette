import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { Commentaire } from './commentaire.entity';

@Controller('commentaire')
export class CommentaireController {
  constructor(private readonly service: CommentaireService) {}

  @Post()
  create(@Body() data: Partial<Commentaire>): Promise<Commentaire> {
    return this.service.create(data);
  }

  @Get('recette/:id')
  findByRecette(@Param('id') id: string): Promise<Commentaire[]> {
    return this.service.findByRecette(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(+id);
  }
}
