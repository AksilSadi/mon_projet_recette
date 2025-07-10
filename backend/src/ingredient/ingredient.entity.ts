import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { RecetteIngredient } from '../recette-ingredient/recette-ingredient.entity'; 

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  categorie: string;

   @OneToMany(() => RecetteIngredient, (ri) => ri.recette, { cascade: true })
recetteIngredients: RecetteIngredient[];
}
