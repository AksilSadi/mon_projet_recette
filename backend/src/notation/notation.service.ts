import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notation } from './notation.entity';

@Injectable()
export class NotationService {
  constructor(
    @InjectRepository(Notation)
    private readonly notationRepo: Repository<Notation>,
  ) {}

  // creer ou mettre à jour une notation
  async rate(data: Partial<Notation>): Promise<Notation> {
  if (!data.utilisateurId || !data.recetteId || typeof data.note !== 'number') {
    throw new Error("Données de notation incomplètes");
  }

  const existing = await this.notationRepo.findOne({
    where: {
      utilisateur: { id: data.utilisateurId },
      recette: { id: data.recetteId },
    },
  });

  if (existing) {
    existing.note = data.note;
    return this.notationRepo.save(existing);
  }

  const newNotation = this.notationRepo.create({
    utilisateur: { id: data.utilisateurId },
    recette: { id: data.recetteId },
    note: data.note,
  });

  return this.notationRepo.save(newNotation);
}


  // Moyenne des notes d'une recette
  async averageByRecette(recetteId: number): Promise<number> {
  const result = await this.notationRepo
    .createQueryBuilder('notation')
    .select('AVG(notation.note)', 'avg')
    .where('notation.recetteId = :id', { id: recetteId })
    .getRawOne<{ avg: string | null }>();

  return result?.avg ? parseFloat(result.avg) : 0;
}

  // Lister toutes les notes d'une recette
  findByRecette(recetteId: number): Promise<Notation[]> {
    return this.notationRepo.find({
      where: { recette: { id: recetteId } },
    });
  }
  async findByUserAndRecette(utilisateurId: number, recetteId: number): Promise<Notation | null> {
  return this.notationRepo.findOne({
    where: {
      utilisateur: { id: utilisateurId },
      recette: { id: recetteId }
    }
  });
}
}
