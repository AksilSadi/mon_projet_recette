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
      host: 'dpg-d1roc77gi27c73ckl74g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'recette_cuisine_157f_user',
      password: 'dcre8KJr1qDwkkJTkyIdHMLAmJUCDbYS', 
      database: 'recette_cuisine_157f',
  entities: [Utilisateur, Recette, Ingredient, RecetteIngredient, Commentaire, Notation, Favoris],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false // Ceci est souvent nécessaire pour les services cloud comme Render
                              // quand on n'a pas un certificat racine spécifique.
                              // Pour une sécurité maximale en production, il faudrait un certificat.
  }
});