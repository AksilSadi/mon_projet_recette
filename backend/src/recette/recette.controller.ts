import { Controller, Get, Post, Put, Delete, Param, Body , ParseIntPipe,UploadedFile, UseInterceptors } from '@nestjs/common';
import { RecetteService } from './recette.service';
import { Recette } from './recette.entity';
import { Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
interface RecettePayload {
  titre: string;
  description: string;
  etapes: string;
  temps: number;
  type:string;
  utilisateurId: number;
}
@Controller('recettes')
export class RecetteController {
  constructor(private readonly service: RecetteService) {}

@Get()
  findPaginated(
    @Query('page', new ParseIntPipe()) page = 1,
    @Query('limit', new ParseIntPipe()) limit = 5,
  ) {
    return this.service.findPaginated(page, limit);
  }

@Get('card')
findWithStats(
  @Query('page', new ParseIntPipe()) page = 1,
  @Query('limit', new ParseIntPipe()) limit = 5,
  @Query('temps') temps?: number,
  @Query('categorie') categorie?: string,
) {
  console.log('Valeur catégorie reçue:', categorie);
  return this.service.findRecettesWithStats(page, limit,temps,categorie);
}
 @Get('favoris')
  findCards(
    @Query('utilisateurId', new ParseIntPipe()) utilisateurId: number,
    @Query('page', new ParseIntPipe()) page = 1,
    @Query('limit', new ParseIntPipe()) limit = 5,
  ) {
    return this.service.findRecettesFavoris(utilisateurId, page, limit);
  }

@Get('search')
  searchByIngredient(
    @Query('ingredient') nom: string,
    @Query('page', new ParseIntPipe()) page = 1,
    @Query('limit', new ParseIntPipe()) limit = 5,
    @Query('temps') temps?: number,
    @Query('categorie') categorie?: string,
  ) {
    return this.service.findRecettesWithStatsFilteredByIngredient(nom, page, limit,temps,categorie);
  }


  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recette | null> {
    return this.service.findOne(+id);
  }
  @Get(':id/favoris/count')
  getFavoriCount(@Param('id', ParseIntPipe) id: number) {
    return this.service.getFavoriCountByRecetteId(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `recette-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async create(
  @UploadedFile() file: Express.Multer.File,
  @Body() body: RecettePayload
) {
  const recette: RecettePayload & { image: string | null } = {
    ...body,
    image: file?.filename || null,
  };
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
  @Get(':id/ingredients')
  getDetails(@Param('id', ParseIntPipe) id: number) {
    return this.service.getRecetteDetails(id);
  }
  @Get(':id/commentaires')
  getCommentaires(@Param('id', ParseIntPipe) id: number) {
    return this.service.getCommentaires(id);
  }
  
}
