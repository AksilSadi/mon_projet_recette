import { Test, TestingModule } from '@nestjs/testing';
import { NotationController } from './notation.controller';

describe('NotationController', () => {
  let controller: NotationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotationController],
    }).compile();

    controller = module.get<NotationController>(NotationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
