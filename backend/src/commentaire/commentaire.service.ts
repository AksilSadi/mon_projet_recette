import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commentaire } from './commentaire.entity';

@Injectable()
export class CommentaireService {
  constructor(
    @InjectRepository(Commentaire)
    private readonly commentaireRepo: Repository<Commentaire>,
  ) {}

  create(data: Partial<Commentaire>): Promise<Commentaire> {
    const commentaire = this.commentaireRepo.create(data);
    return this.commentaireRepo.save(commentaire);
  }

  findByRecette(recetteId: number): Promise<Commentaire[]> {
    return this.commentaireRepo.find({
      where: { recette: { id: recetteId } },
      order: { date: 'DESC' },
    });
  }

  delete(id: number): Promise<void> {
    return this.commentaireRepo.delete(id).then(() => undefined);
  }
}
