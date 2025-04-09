import { Module } from '@nestjs/common';
import { MoviesController } from './controller/movies.controller';
import { MoviesService } from './service/movies.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
