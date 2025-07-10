import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetteIngredient } from './recette-ingredient.entity';

@Injectable()
export class RecetteIngredientService {
  constructor(
    @InjectRepository(RecetteIngredient)
    private readonly recetteIngredientRepo: Repository<RecetteIngredient>,
  ) {}

  // Créer une association recette-ingrédient
  create(data: Partial<RecetteIngredient>): Promise<RecetteIngredient> {
    const ri = this.recetteIngredientRepo.create(data);
    return this.recetteIngredientRepo.save(ri);
  }

  // Lister tous les ingrédients d'une recette
  findByRecetteId(recetteId: number): Promise<RecetteIngredient[]> {
    return this.recetteIngredientRepo.find({
      where: { recette: { id: recetteId } },
      relations: ['ingredient'], // pour avoir les noms d'ingrédients, etc.
    });
  }

  // Supprimer un lien recette-ingrédient (optionnel)
  async delete(id: number): Promise<void> {
    await this.recetteIngredientRepo.delete(id);
  }

  // Mettre à jour quantité ou unité
  async update(id: number, data: Partial<RecetteIngredient>): Promise<RecetteIngredient> {
    await this.recetteIngredientRepo.update(id, data);
    const updated = await this.recetteIngredientRepo.findOne({
      where: { id },
      relations: ['ingredient', 'recette'],
    });
    if (!updated) throw new Error('Association non trouvée');
    return updated;
  }
}
