import { Controller, Get, Query, Post, Body, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieQueryFilterDTO } from './dto/movieQueryFIlterDTO';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { Movie } from './entity/movie.entity';
import { CreateMovieDto } from './dto/createMovieDTO';
import { UserGuard } from 'src/auth/guards/userGuard';
import { AdminGuard } from 'src/auth/guards/adminGuard';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optionalGuard';

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
  @UseGuards(OptionalJwtAuthGuard)
  getAllMovies(@Query() query: MovieQueryFilterDTO, @Req() req: any) {
    console.log('User from Request:', req.user);
    return this.movieService.getAllMovies(query, req.user ? (req.user.userId as number) : null);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiOkResponse({
    description: 'The movie has been successfully created.',
    type: Movie,
  })
  @UseGuards(UserGuard, AdminGuard)
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.movieService.createMovie(movieData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiOkResponse({
    description: 'The movie has been successfully deleted.',
  })
  @UseGuards(UserGuard, AdminGuard)
  deleteMovie(@Query('id') id: number) {
    return this.movieService.deleteMovie(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiOkResponse({
    description: 'The movie has been successfully updated.',
    type: Movie,
  })
  @UseGuards(UserGuard, AdminGuard)
  updateMovie(@Query('id') id: number, @Body() movieData: CreateMovieDto) {
    return this.movieService.updateMovie(id, movieData);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiOkResponse({
    description: 'The movie has been successfully retrieved.',
    type: Movie,
  })
  getMovieById(@Query('id') id: number) {
    return this.movieService.getMovieById(id);
  }
}