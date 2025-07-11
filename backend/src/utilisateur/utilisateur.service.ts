import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur.entity';
import { Repository } from 'typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepo: Repository<Utilisateur>,
  ) {}

  findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepo.find();
  }

  findOne(id: number): Promise<Utilisateur | null> {
    return this.utilisateurRepo.findOneBy({ id });
  }

  create(utilisateur: Partial<Utilisateur>): Promise<Utilisateur> {
    const newUser = this.utilisateurRepo.create(utilisateur);
    return this.utilisateurRepo.save(newUser);
  }

  async update(id: number, data: Partial<Utilisateur>): Promise<Utilisateur | null> {
    await this.utilisateurRepo.update(id, data);
    return this.findOne(id);
  }
  async login(email: string, motDePasse: string) {
  const utilisateur = await this.utilisateurRepo.findOneBy({ email });

  if (!utilisateur) {
    throw new NotFoundException("L'email n'existe pas. Veuillez créer un compte.");
  }

  if (utilisateur.motDePasse !== motDePasse) {
    throw new UnauthorizedException('Mot de passe incorrect.');
  }

  return {
    message: 'Connexion réussie',
    utilisateur,
  };
}

  delete(id: number): Promise<void> {
    return this.utilisateurRepo.delete(id).then(() => undefined);
  }
}
