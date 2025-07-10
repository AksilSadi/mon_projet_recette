import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recette } from './recette.entity';

@Injectable()
export class RecetteService {
  constructor(
    @InjectRepository(Recette)
    private readonly recetteRepo: Repository<Recette>,
  ) {}

  findAll(): Promise<Recette[]> {
    return this.recetteRepo.find();
  }

  findOne(id: number): Promise<Recette | null> {
    return this.recetteRepo.findOneBy({ id });
  }

  create(recette: Partial<Recette>): Promise<Recette> {
    const newRecette = this.recetteRepo.create(recette);
    return this.recetteRepo.save(newRecette);
  }

  async update(id: number, data: Partial<Recette>): Promise<Recette> {
    await this.recetteRepo.update(id, data);
    const updated = await this.findOne(id);
    if (!updated) throw new Error('Recette non trouvée');
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.recetteRepo.delete(id);
  }
}