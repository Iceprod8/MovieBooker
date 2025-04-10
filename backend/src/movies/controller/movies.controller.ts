import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { MoviesService } from '../service/movies.service';
import { JwtAuthGuard } from '../../user/jwt/jwt-auth.guard';
import { TmdbMovieDto, TmdbMoviesResponseDto } from '../dto/movies.dto';

@ApiTags('Movies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Récupère une liste de films' })
  @ApiResponse({
    status: 200,
    description: 'Liste des films correspondant aux critères',
    type: TmdbMoviesResponseDto,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Numéro de page (par défaut 1)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Recherche par titre',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Critère de tri',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Nombre de sorties par page (par défaut 25)',
  })
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('limit') limit?: number,
  ): Promise<TmdbMoviesResponseDto> {
    return this.moviesService.findAll(page, search, sort, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: "Récupère le détail d'un film par ID" })
  @ApiResponse({
    status: 200,
    description: "Le détail du film correspondant à l'ID",
    type: TmdbMovieDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identifiant du film',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TmdbMovieDto> {
    return this.moviesService.findOne(id);
  }
}
