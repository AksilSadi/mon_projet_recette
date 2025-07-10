import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { Favoris } from './favoris.entity';

@Controller('favoris')
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  // Ajouter une recette aux favoris
  @Post()
  async add(@Body() body: { utilisateurId: number; recetteId: number }): Promise<Favoris> {
    const { utilisateurId, recetteId } = body;
    try {
      return await this.favorisService.addFavori(utilisateurId, recetteId);
    } catch {
      throw new HttpException('Favori déjà existant ou erreur', HttpStatus.BAD_REQUEST);
    }
  }

  // Supprimer une recette des favoris
  @Delete()
  async remove(@Body() body: { utilisateurId: number; recetteId: number }): Promise<void> {
    const { utilisateurId, recetteId } = body;
    await this.favorisService.removeFavori(utilisateurId, recetteId);
  }

  // Obtenir toutes les recettes favorites d’un utilisateur
  @Get(':utilisateurId')
  async getAll(@Param('utilisateurId') utilisateurId: string): Promise<Favoris[]> {
    return this.favorisService.findByUtilisateur(+utilisateurId);
  }

  // Vérifier si une recette est en favori
  @Get('is/:utilisateurId/:recetteId')
  async isFavori(
    @Param('utilisateurId') utilisateurId: string,
    @Param('recetteId') recetteId: string,
  ): Promise<{ isFavori: boolean }> {
    const result = await this.favorisService.isFavori(+utilisateurId, +recetteId);
    return { isFavori: result };
  }
}
