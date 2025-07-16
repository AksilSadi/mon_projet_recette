import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany,JoinColumn } from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { RecetteIngredient } from '../recette-ingredient/recette-ingredient.entity';
import { Commentaire } from '../commentaire/commentaire.entity';
import { Notation } from '../notation/notation.entity';
import { Favoris } from '../favoris/favoris.entity';

@Entity()
export class Recette {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column({ type: 'text' })
  description: string;

  @Column('text')
  etapes: string;

  @Column()
  temps: number;

  @Column()
  type:string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.recettes)
  @JoinColumn({ name: 'utilisateurId' })
  utilisateur: Utilisateur;

  @Column()
  utilisateurId: number;

  @OneToMany(() => RecetteIngredient, (ri) => ri.recette, { cascade: true })
  recetteIngredients: RecetteIngredient[];
  @OneToMany(() => Commentaire, (commentaire) => commentaire.recette)
  commentaires: Commentaire[];
  @OneToMany(() => Notation, (notation) => notation.recette)
  notations: Notation[]; 
  @OneToMany(() => Favoris, (favoris) => favoris.recette)
  favoris: Favoris[];
}
