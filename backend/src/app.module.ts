import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { RecetteModule } from './recette/recette.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecetteIngredientModule } from './recette-ingredient/recette-ingredient.module';
import { CommentaireModule } from './commentaire/commentaire.module';
import { NotationModule } from './notation/notation.module';
import { FavorisModule } from './favoris/favoris.module';
import { Utilisateur } from './utilisateur/utilisateur.entity';
import { Recette } from './recette/recette.entity';
import { Ingredient } from './ingredient/ingredient.entity';
import { RecetteIngredient } from './recette-ingredient/recette-ingredient.entity';
import { Commentaire } from './commentaire/commentaire.entity';
import { Notation } from './notation/notation.entity';
import { Favoris } from './favoris/favoris.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileController } from './file/file.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'lionel12', 
      database: 'recette_cuisine',
      autoLoadEntities: true,
      synchronize: false, 
    }),
    TypeOrmModule.forFeature([
      Utilisateur,
      Recette,
      Ingredient,
      RecetteIngredient,
      Commentaire,
      Notation,
      Favoris,
    ]),
    UtilisateurModule,
    RecetteModule,
    IngredientModule,
    RecetteIngredientModule,
    CommentaireModule,
    NotationModule,
    FavorisModule,
  ],
  controllers: [AppController,FileController],
  providers: [AppService],
})
export class AppModule {}
