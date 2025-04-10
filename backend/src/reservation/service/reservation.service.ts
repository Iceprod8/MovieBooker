import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateReservationDto,
  ResponseReservationDto,
} from '../dto/reservation.dto';
import { Reservation } from '../entity/reservation.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ReservationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async createReservation(dto: CreateReservationDto, access_token: string) {
    const token = access_token.replace('Bearer ', '');
    const user = this.jwtService.decode(token);
    const date = new Date(dto.date);
    const twoHoursBefore = new Date(date.getTime() - 2 * 60 * 60 * 1000);
    const twoHoursAfter = new Date(date.getTime() + 2 * 60 * 60 * 1000);
    const existingReservation = await this.reservationRepository.findOne({
      where: {
        user: user.id,
        date: Between(twoHoursBefore, twoHoursAfter),
      },
    });
    if (existingReservation) {
      throw new BadRequestException(
        "Vous avez réservé un film trop proche d'un autre.",
      );
    }
    const reservation = this.reservationRepository.create({
      movieId: dto.movieId,
      date,
      user: user.id,
    });
    await this.reservationRepository.save(reservation);
    const saved = await this.reservationRepository.findOne({
      where: { id: reservation.id },
      relations: ['user'],
    });
    return {
      id: saved!.id,
      movieId: saved!.movieId,
      date: saved!.date,
      user: Array.isArray(saved!.user)
        ? saved!.user.map(({ password, ...rest }) => rest)
        : saved!.user,
    } as ResponseReservationDto;
  }

  async getReservation(access_token: string) {
    const token = access_token.replace('Bearer ', '');
    const user = this.jwtService.decode(token);
    const reservations = await this.reservationRepository.find({
      where: { user: user.id },
      relations: ['user'],
    });
    if (!reservations) {
      throw new BadRequestException('Aucune réservation trouvée.');
    }
    return reservations.map((r) => ({
      id: r.id,
      movieId: r.movieId,
      date: r.date,
      user: Array.isArray(r.user)
        ? r.user.map(({ password, ...rest }) => rest)
        : r.user,
    })) as ResponseReservationDto[];
  }

  async deleteReservation(id: number, access_token: string) {
    const token = access_token.replace('Bearer ', '');
    const user = this.jwtService.decode(token);
    const reservation = await this.reservationRepository.findOne({
      where: { user: user.id, id },
      relations: ['user'],
    });
    if (!reservation) {
      throw new NotFoundException(
        `Aucune réservation trouvée avec l'ID ${id}.`,
      );
    }
    const result = await this.reservationRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(
        `Impossible de supprimer la réservation avec l'ID ${id}.`,
      );
    }
    return {
      message: `Réservation avec l'ID ${id} supprimée avec succès.`,
      id,
      user: Array.isArray(reservation.user)
        ? reservation.user.map(({ password, ...rest }) => rest)
        : reservation.user,
    };
  }
}
