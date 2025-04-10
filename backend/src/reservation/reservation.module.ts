import { Module } from '@nestjs/common';
import { ReservationController } from './controller/reservation.controller';
import { ReservationService } from './service/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User]), UserModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
