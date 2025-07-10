import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favoris } from './favoris.entity'; 

@Injectable()
export class FavorisService {
 constructor(
        @InjectRepository(Favoris)
        private readonly repo: Repository<Favoris>,
    ) {}

    async addFavori(utilisateurId: number, recetteId: number): Promise<Favoris> {
  const favori = this.repo.create({ utilisateurId, recetteId });
  return this.repo.save(favori);
}

async removeFavori(utilisateurId: number, recetteId: number): Promise<void> {
  await this.repo.delete({ utilisateurId, recetteId });
}

async findByUtilisateur(utilisateurId: number): Promise<Favoris[]> {
  return this.repo.find({
    where: { utilisateurId },
    relations: ['recette'],
  });
}

async isFavori(utilisateurId: number, recetteId: number): Promise<boolean> {
  const existing = await this.repo.findOne({ where: { utilisateurId, recetteId } });
  return !!existing;
}

}
