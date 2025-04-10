import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { TmdbMovie, TmdbMoviesResponse } from '../interface/movies.interface';
import { AxiosError } from 'axios';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(
    page = 1,
    search?: string,
    sort = 'popularity.desc',
    limit = 25,
  ): Promise<TmdbMoviesResponse> {
    const apiUrl = this.configService.get<string>('API_URL');

    let url = `${apiUrl}3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sort}&limit=${limit}`;
    if (search && search.trim()) {
      url = `${apiUrl}3/search/movie?query=${encodeURIComponent(
        search,
      )}&include_adult=false&language=en-US&page=${page}&limit=${limit}`;
    }
    const response = await firstValueFrom(
      this.httpService
        .get<TmdbMoviesResponse>(url, {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer ' + this.configService.get<string>('API_KEY'),
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error?.response?.data);
            throw new Error('An error happened!');
          }),
        ),
    );
    return response.data;
  }

  async findOne(id: number): Promise<TmdbMovie> {
    const apiUrl = this.configService.get<string>('API_URL');
    const url = `${apiUrl}3/movie/${id}?language=en-US`;

    const response = await firstValueFrom(
      this.httpService
        .get<TmdbMovie>(url, {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer ' + this.configService.get<string>('API_KEY'),
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error?.response?.data);
            throw new Error('An error happened!');
          }),
        ),
    );

    return response.data;
  }
}
