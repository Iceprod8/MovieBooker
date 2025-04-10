import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../entity/reservation.entity';
import { CreateReservationDto } from '../dto/reservation.dto';

describe('ReservationService', () => {
  let service: ReservationService;
  let reservationRepoMock: Partial<Repository<Reservation>>;
  let jwtServiceMock: Partial<JwtService>;

  beforeEach(async () => {
    reservationRepoMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    };
    jwtServiceMock = { decode: jest.fn().mockReturnValue({ id: 1 }) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: JwtService, useValue: jwtServiceMock },
        {
          provide: getRepositoryToken(Reservation),
          useValue: reservationRepoMock,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  describe('createReservation', () => {
    it('should create reservation correctly', async () => {
      const dto: CreateReservationDto = {
        movieId: 10,
        date: Date.now(),
      };

      reservationRepoMock.findOne = jest.fn().mockResolvedValue(null);
      reservationRepoMock.create = jest.fn().mockReturnValue({ id: 1, ...dto });
      reservationRepoMock.save = jest.fn().mockResolvedValue({ id: 1, ...dto });

      const result = await service.createReservation(dto, 'Bearer token');

      expect(result).toMatchObject({ id: 1, movieId: dto.movieId });
    });
  });

  describe('getReservation', () => {
    it('should get user reservations', async () => {
      reservationRepoMock.find = jest
        .fn()
        .mockResolvedValue([{ id: 1, movieId: 10, date: new Date() }]);

      const result = await service.getReservation('Bearer token');

      expect(jwtServiceMock.decode).toHaveBeenCalled();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, movieId: 10 }),
        ]),
      );
    });
  });

  describe('deleteReservation', () => {
    it('should delete reservation correctly', async () => {
      reservationRepoMock.findOne = jest.fn().mockResolvedValue({ id: 1 });
      reservationRepoMock.delete = jest.fn().mockResolvedValue({ affected: 1 });

      const result = await service.deleteReservation(1, 'Bearer token');

      expect(reservationRepoMock.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        message: "Réservation avec l'ID 1 supprimée avec succès.",
        id: 1,
      });
    });
  });
});
