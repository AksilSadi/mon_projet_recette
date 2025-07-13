import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepo: Repository<Ingredient>,
  ) {}

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepo.find();
  }

  findOne(id: number): Promise<Ingredient | null> {
    return this.ingredientRepo.findOneBy({ id });
  }

  create(ingredient: Partial<Ingredient>): Promise<Ingredient> {
    const newIngredient = this.ingredientRepo.create(ingredient);
    return this.ingredientRepo.save(newIngredient);
  }

  async update(id: number, data: Partial<Ingredient>): Promise<Ingredient> {
    await this.ingredientRepo.update(id, data);
    const updated = await this.findOne(id);
    if (!updated) throw new Error('Ingredient non trouvé');
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.ingredientRepo.delete(id);
  }

  async findPaginated(page: number, limit: number) {
    const [data, total] = await this.ingredientRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
