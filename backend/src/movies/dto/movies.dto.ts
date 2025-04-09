import { ApiProperty } from '@nestjs/swagger';

export class TmdbMovieDto {
  @ApiProperty()
  adult: boolean;

  @ApiProperty()
  backdrop_path: string;

  @ApiProperty({
    type: [Number],
    description: 'Liste des ID de genres',
  })
  genre_ids: number[];

  @ApiProperty()
  id: number;

  @ApiProperty()
  original_language: string;

  @ApiProperty()
  original_title: string;

  @ApiProperty()
  overview: string;

  @ApiProperty()
  popularity: number;

  @ApiProperty()
  poster_path: string;

  @ApiProperty()
  release_date: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  video: boolean;

  @ApiProperty()
  vote_average: number;

  @ApiProperty()
  vote_count: number;
}

export class TmdbMoviesResponseDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  total_results: number;

  @ApiProperty()
  total_pages: number;

  @ApiProperty({
    type: [TmdbMovieDto],
    description: "Liste des films renvoyés par l'API",
  })
  results: TmdbMovieDto[];
}
