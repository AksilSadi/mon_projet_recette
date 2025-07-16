import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Recette } from '../recette/recette.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
@Unique(['recette', 'utilisateur']) // Un utilisateur ne peut noter une recette qu'une seule fois
export class Notation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  note: number;

  @ManyToOne(() => Recette, (recette) => recette.notations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recetteId' })
  recette: Recette;
  @Column()
  recetteId: number;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.notations, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateurId' })
  utilisateur: Utilisateur;
  @Column()
  utilisateurId: number;
}
