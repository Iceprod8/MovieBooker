import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpServiceMock: Partial<HttpService>;

  beforeEach(async () => {
    httpServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('findAll', () => {
    it('should fetch movies from external API with page and search', async () => {
      const apiResponse = { data: { results: [{ id: 1, title: 'Film A' }] } };
      httpServiceMock.get = jest.fn().mockReturnValue(of(apiResponse));

      const result = await service.findAll(1, 'Film');

      expect(httpServiceMock.get).toHaveBeenCalledWith(
        expect.stringContaining('page=1&query=Film'),
      );
      expect(result).toEqual(apiResponse.data);
    });
  });

  describe('findOne', () => {
    it('should fetch one movie by id from external API', async () => {
      const apiResponse = { data: { id: 10, title: 'Film A' } };
      httpServiceMock.get = jest.fn().mockReturnValue(of(apiResponse));

      const result = await service.findOne(10);

      expect(httpServiceMock.get).toHaveBeenCalledWith(
        expect.stringContaining('/movie/10'),
      );
      expect(result).toEqual(apiResponse.data);
    });
  });
});
