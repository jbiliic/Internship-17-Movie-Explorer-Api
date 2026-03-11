import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieQueryFilterDTO } from './dto/movieQueryFIlterDTO';
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  getAllMovies(@Query() query: MovieQueryFilterDTO) {
    return this.movieService.getAllMovies(query);
  }
}