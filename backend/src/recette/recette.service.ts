import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recette } from './recette.entity';
interface RecettePayload {
  titre: string;
  description: string;
  etapes: string;
  temps: number ;
  type:string;
  utilisateurId: number;
}
interface RawRecetteStats {
  commentCount: string;
  averageRating: string;
  favoriCount: string;
}
@Injectable()
export class RecetteService {
  constructor(
    @InjectRepository(Recette)
    private readonly recetteRepo: Repository<Recette>,
  ) {}

  findAll(): Promise<Recette[]> {
    return this.recetteRepo.find();
  }

  async findPaginated(page: number, limit: number) {
  const [data, total] = await this.recetteRepo.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    data,
    total,
    page,
    lastPage: Math.ceil(total / limit),
  };
}

 async findRecettesWithStats(page = 1, limit = 5,temps?:number,categorie?:string) {
  try {
    const query=this.recetteRepo
    .createQueryBuilder('recette')
    .leftJoin('recette.commentaires', 'commentaire')
    .leftJoin('recette.notations', 'notation')
    .leftJoin('recette.favoris', 'favoris')
    .select([
      'recette.id',
      'recette.titre',
      'recette.description',
      'recette.etapes',
      'recette.temps',
      'recette.image',
      'recette.type',
    ])
    .addSelect('COUNT(DISTINCT commentaire.id)', 'commentCount')
    .addSelect('AVG(notation.note)', 'averageRating')
    .addSelect('COUNT(DISTINCT favoris.recetteId)', 'favoriCount')
    .groupBy('recette.id')
    .offset((page - 1) * limit)
    .limit(limit)

    if(temps){
      query.where('recette.temps <= :temps', { temps });
    }
    if(categorie){
      query.andWhere('recette.categorie = :categorie', { categorie });
    }
    const { entities, raw } = await query.getRawAndEntities();

    const typedRaw = raw as RawRecetteStats[];
    
  // Associer les stats aux entités
  const data = entities.map((recette, i) => ({
    ...recette,
    commentCount: Number(typedRaw[i]?.commentCount ?? 0),
    averageRating: Number(typedRaw[i]?.averageRating ?? 0),
    favoriCount: Number(typedRaw[i]?.favoriCount ?? 0),
  }));

  return {
    data,
    total: data.length,
    page,
    pageCount: Math.ceil(data.length / limit),
  };
  } catch (error) {
    console.error('Error fetching recettes with stats:', error);
  }
}

async findRecettesFavoris(utilisateurId:number,page = 1, limit = 5) {
  try {
    const { entities, raw } = await this.recetteRepo
    .createQueryBuilder('recette')
    .leftJoin('recette.commentaires', 'commentaire')
    .leftJoin('recette.notations', 'notation')
    .leftJoin('recette.favoris', 'favoris')
    .where('favoris.utilisateurId = :utilisateurId', { utilisateurId })
    .select([
      'recette.id',
      'recette.titre',
      'recette.description',
      'recette.etapes',
      'recette.temps',
      'recette.image',
    ])
    .addSelect('COUNT(DISTINCT commentaire.id)', 'commentCount')
    .addSelect('AVG(notation.note)', 'averageRating')
    .addSelect('COUNT(DISTINCT favoris.recetteId)', 'favoriCount')
    .groupBy('recette.id')
    .offset((page - 1) * limit)
    .limit(limit)
    .getRawAndEntities();

    const typedRaw = raw as RawRecetteStats[];
    
  // Associer les stats aux entités
  const data = entities.map((recette, i) => ({
    ...recette,
    commentCount: Number(typedRaw[i]?.commentCount ?? 0),
    averageRating: Number(typedRaw[i]?.averageRating ?? 0),
    favoriCount: Number(typedRaw[i]?.favoriCount ?? 0),
  }));

  return {
    data,
    total: data.length,
    page,
    pageCount: Math.ceil(data.length / limit),
  };
  } catch (error) {
    console.error('Error fetching recettes with stats:', error);
  }
}


  findOne(id: number): Promise<Recette | null> {
    return this.recetteRepo.findOneBy({ id });
  }

  create(recette: RecettePayload): Promise<Recette> {
    const newRecette = this.recetteRepo.create(recette);
    return this.recetteRepo.save(newRecette);
  }

  async update(id: number, data: Partial<Recette>): Promise<Recette> {
    await this.recetteRepo.update(id, data);
    const updated = await this.findOne(id);
    if (!updated) throw new Error('Recette non trouvée');
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.recetteRepo.delete(id);
  }

  async getRecetteDetails(id: number) {
  return this.recetteRepo.findOne({
    where: { id },
    relations: [
      'recetteIngredients',
    ],
  });
}
  async getCommentaires(id: number) {
    const recette = await this.recetteRepo.findOne({
      where: { id },
      relations: ['commentaires'],
    });
    return recette ? recette.commentaires : [];
  }

  async findRecettesWithStatsFilteredByIngredient(nomIngredient: string, page = 1, limit = 5,temps?:number,categorie?:string) {
  try {
    const query=this.recetteRepo
      .createQueryBuilder('recette')
      .leftJoin('recette.commentaires', 'commentaire')
      .leftJoin('recette.notations', 'notation')
      .leftJoin('recette.favoris', 'favoris')
      .leftJoin('recette.recetteIngredients', 'ri')
      .leftJoin('ri.ingredient', 'ingredient')
      .where('ingredient.nom ILIKE :nom', { nom: `${nomIngredient}%` })
      .select([
        'recette.id',
        'recette.titre',
        'recette.description',
        'recette.etapes',
        'recette.temps',
        'recette.image',
      ])
      .addSelect('COUNT(DISTINCT commentaire.id)', 'commentCount')
      .addSelect('AVG(notation.note)', 'averageRating')
      .addSelect('COUNT(DISTINCT favoris.recetteId)', 'favoriCount')
      .groupBy('recette.id')
      .offset((page - 1) * limit)
      .limit(limit)
      if(temps){
        query.andWhere('recette.temps <= :temps', { temps });
      }
      if(categorie){
      query.andWhere('recette.type ILIKE :categorie', { categorie: `${categorie}%` });
    }
    const { entities, raw } = await query.getRawAndEntities();

    const typedRaw = raw as RawRecetteStats[];

    const data = entities.map((recette, i) => ({
      ...recette,
      commentCount: Number(typedRaw[i]?.commentCount ?? 0),
      averageRating: Number(typedRaw[i]?.averageRating ?? 0),
      favoriCount: Number(typedRaw[i]?.favoriCount ?? 0),
    }));

    return {
      data,
      total: data.length,
      page,
      pageCount: Math.ceil(data.length / limit),
    };
  } catch (error) {
    console.error('Error fetching recettes with ingredient filter:', error);
    throw new Error('Erreur lors de la recherche de recettes.');
  }
}

}