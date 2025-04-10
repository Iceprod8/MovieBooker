import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from '../service/movies.service';
import { JwtService } from '@nestjs/jwt';

describe('MoviesController', () => {
  let controller: MoviesController;
  let moviesServiceMock: Partial<MoviesService>;
  let jwtServiceMock: Partial<JwtService>;

  beforeEach(async () => {
    jwtServiceMock = {
      decode: jest.fn().mockReturnValue({ id: 1, username: 'testuser' }),
    };

    moviesServiceMock = {
      findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Movie A' }]),
      findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Movie A' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        { provide: MoviesService, useValue: moviesServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Correction movies.controller.spec.ts

  describe('findAll', () => {
    it('should call MoviesService.findAll', async () => {
      const result = await controller.findAll();
      expect(moviesServiceMock.findAll).toHaveBeenCalled();
      expect(result).toEqual([{ id: 1, title: 'Movie A' }]);
    });
  });

  describe('findOne', () => {
    it('should call MoviesService.findOne', async () => {
      const result = await controller.findOne(1);
      expect(moviesServiceMock.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1, title: 'Movie A' });
    });
  });
});
