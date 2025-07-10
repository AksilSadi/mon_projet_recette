// backend/data-source.ts
import { DataSource } from 'typeorm';
import { Utilisateur } from './src/utilisateur/utilisateur.entity';
import { Recette } from './src/recette/recette.entity';
import { Ingredient } from './src/ingredient/ingredient.entity';
import { RecetteIngredient } from './src/recette-ingredient/recette-ingredient.entity';
import { Commentaire } from './src/commentaire/commentaire.entity';
import { Notation } from './src/notation/notation.entity';
import { Favoris } from './src/favoris/favoris.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'lionel12',
  database: 'recette_cuisine',
  entities: [Utilisateur, Recette, Ingredient, RecetteIngredient, Commentaire, Notation, Favoris],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});