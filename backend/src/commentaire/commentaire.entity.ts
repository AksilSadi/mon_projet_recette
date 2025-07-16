import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Recette } from '../recette/recette.entity';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Commentaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  texte: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Recette, (recette) => recette.commentaires, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recetteId' })
  recette: Recette;
  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.commentaires, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'utilisateurId' })
  utilisateur: Utilisateur;

  @Column({ nullable: false })
  recetteId: number;
  @Column({ nullable: false })
  utilisateurId: number;
}
