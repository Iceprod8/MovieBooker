import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/jwt/jwt-auth.guard';
import {
  CreateReservationDto,
  ResponseDeleteReservationDto,
  ResponseReservationDto,
} from '../dto/reservation.dto';
import { ReservationService } from '../service/reservation.service';

@ApiTags('Reservation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post('')
  @ApiOperation({ summary: 'Reserver un film par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Reserver un film via son ID',
    type: CreateReservationDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identifiant du film',
  })
  @ApiParam({
    name: 'date',
    type: Date,
    description: 'Date de la reservation du film',
  })
  async createReservation(
    @Body() dto: CreateReservationDto,
    @Headers('Authorization') access_token: string,
  ): Promise<ResponseReservationDto> {
    return this.reservationService.createReservation(dto, access_token);
  }

  @Get('')
  @ApiOperation({ summary: "Recupere les film reserver d'un user" })
  @ApiResponse({
    status: 200,
    description: "Recupere des films reserver d'un user",
    type: CreateReservationDto,
  })
  async getReservation(
    @Headers('Authorization') access_token: string,
  ): Promise<ResponseReservationDto[]> {
    return this.reservationService.getReservation(access_token);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Supprime une reserver d'un film d'un user" })
  @ApiResponse({
    status: 200,
    description: "Supprime une reservation d'un film d'un user",
    type: CreateReservationDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identifiant de la reservation',
  })
  async deleteReservation(
    @Param('id', ParseIntPipe) id: number,
    @Headers('Authorization') access_token: string,
  ): Promise<ResponseDeleteReservationDto> {
    return this.reservationService.deleteReservation(id, access_token);
  }
}
