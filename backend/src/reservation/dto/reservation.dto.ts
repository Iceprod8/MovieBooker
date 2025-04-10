import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty()
  date: number;

  @ApiProperty()
  movieId: number;
}

export class ResponseReservationDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  movieId: number;

  @ApiProperty()
  id: number;
}

export class DeleteReservationDto {
  @ApiProperty()
  id: number;
}

export class ResponseDeleteReservationDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  id: number;
}
