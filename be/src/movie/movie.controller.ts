import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieQueryFilterDTO } from './dto/movieQueryFIlterDTO';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { Movie } from './entity/movie.entity';
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  @ApiOperation({ summary: 'Get all movies with filters' })
  @ApiOkResponse({
    description: 'The list of movies has been successfully retrieved.',
    type: Movie,
    isArray: true
  })
  getAllMovies(@Query() query: MovieQueryFilterDTO) {
    return this.movieService.getAllMovies(query);
  }
}