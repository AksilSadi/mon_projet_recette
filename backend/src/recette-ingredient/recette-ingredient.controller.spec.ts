import { Test, TestingModule } from '@nestjs/testing';
import { RecetteIngredientController } from './recette-ingredient.controller';

describe('RecetteIngredientController', () => {
  let controller: RecetteIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetteIngredientController],
    }).compile();

    controller = module.get<RecetteIngredientController>(RecetteIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
