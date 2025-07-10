import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { Recette } from '../recette/recette.entity';

@Entity()
export class Favoris {
  @PrimaryColumn()
  utilisateurId: number;

  @PrimaryColumn()
  recetteId: number;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.favoris, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateurId' })
  utilisateur: Utilisateur;

  @ManyToOne(() => Recette, (recette) => recette.favoris, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recetteId' })
  recette: Recette;
}
