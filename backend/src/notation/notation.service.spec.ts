import { Test, TestingModule } from '@nestjs/testing';
import { NotationService } from './notation.service';

describe('NotationService', () => {
  let service: NotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotationService],
    }).compile();

    service = module.get<NotationService>(NotationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
