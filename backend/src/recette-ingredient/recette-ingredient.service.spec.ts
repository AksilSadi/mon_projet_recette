import { Test, TestingModule } from '@nestjs/testing';
import { RecetteIngredientService } from './recette-ingredient.service';

describe('RecetteIngredientService', () => {
  let service: RecetteIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecetteIngredientService],
    }).compile();

    service = module.get<RecetteIngredientService>(RecetteIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
