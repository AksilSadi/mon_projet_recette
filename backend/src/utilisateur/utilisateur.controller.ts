import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './utilisateur.entity';

@Controller('utilisateurs')
export class UtilisateurController {
  constructor(private readonly service: UtilisateurService) {}

  @Get()
  findAll(): Promise<Utilisateur[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Utilisateur | null> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() body: Partial<Utilisateur>): Promise<Utilisateur> {
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Utilisateur>): Promise<Utilisateur | null> {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(+id);
  }
}
