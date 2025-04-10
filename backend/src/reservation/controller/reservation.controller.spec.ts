import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from '../service/reservation.service';
import { JwtService } from '@nestjs/jwt';
import { CreateReservationDto } from '../dto/reservation.dto';

describe('ReservationController', () => {
  let controller: ReservationController;
  let reservationServiceMock: Partial<ReservationService>;
  let jwtServiceMock: Partial<JwtService>;

  beforeEach(async () => {
    jwtServiceMock = {
      decode: jest.fn().mockReturnValue({ id: 1, username: 'testuser' }),
    };

    reservationServiceMock = {
      createReservation: jest.fn(),
      getReservation: jest.fn(),
      deleteReservation: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        { provide: ReservationService, useValue: reservationServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createReservation', () => {
    it('should call ReservationService.createReservation with decoded user token', async () => {
      const dto: CreateReservationDto = { movieId: 123, date: Date.now() };
      const token = 'Bearer valid.jwt.token';

      reservationServiceMock.createReservation = jest
        .fn()
        .mockResolvedValue({ id: 1, ...dto });

      const result = await controller.createReservation(dto, token);

      expect(jwtServiceMock.decode).toHaveBeenCalledWith('valid.jwt.token');
      expect(reservationServiceMock.createReservation).toHaveBeenCalledWith(
        dto,
        token,
      );
      expect(result).toEqual({ id: 1, movieId: 123, date: dto.date });
    });
  });

  describe('getReservation', () => {
    it('should call ReservationService.getReservation and return reservations', async () => {
      const token = 'Bearer token';
      reservationServiceMock.getReservation = jest
        .fn()
        .mockResolvedValue([{ id: 1, movieId: 123 }]);

      const result = await controller.getReservation(token);

      expect(reservationServiceMock.getReservation).toHaveBeenCalledWith(token);
      expect(result).toEqual([{ id: 1, movieId: 123 }]);
    });
  });

  describe('deleteReservation', () => {
    it('should call ReservationService.deleteReservation and return a success message', async () => {
      const token = 'Bearer token';
      const reservationId = 1;

      reservationServiceMock.deleteReservation = jest
        .fn()
        .mockResolvedValue({ message: 'ok' });

      const result = await controller.deleteReservation(reservationId, token);

      expect(reservationServiceMock.deleteReservation).toHaveBeenCalledWith(
        reservationId,
        token,
      );
      expect(result).toEqual({ message: 'ok' });
    });
  });
});
