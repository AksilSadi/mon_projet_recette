// src/utilisateur/utilisateur.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recette } from '../recette/recette.entity';
import { Commentaire } from '../commentaire/commentaire.entity';
import { Notation } from '../notation/notation.entity';
import { Favoris } from '../favoris/favoris.entity';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ type: 'enum', enum: ['cuisinier', 'visiteur'], default: 'visiteur' })
  role: 'cuisinier' | 'visiteur';

  @Column({ unique: true })
  email: string;

  @Column()
  motDePasse: string;

  @OneToMany(() => Recette, (recette) => recette.utilisateur)
  recettes: Recette[];

  @OneToMany(() => Commentaire, (commentaire) => commentaire.utilisateur)
  commentaires: Commentaire[];

  @OneToMany(() => Notation, (notation) => notation.utilisateur)
  notations: Notation[];

  @OneToMany(() => Favoris, (favoris) => favoris.utilisateur)
  favoris: Favoris[];
}
