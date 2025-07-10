import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Recette } from '../recette/recette.entity';
import { Ingredient } from '../ingredient/ingredient.entity';

@Entity()
export class RecetteIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recette, (recette) => recette.recetteIngredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recetteId' })
  recette: Recette;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recetteIngredients, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredientId' })
  ingredient: Ingredient;

  @Column('float')
  quantite: number;

  @Column()
  unite: string;
}
