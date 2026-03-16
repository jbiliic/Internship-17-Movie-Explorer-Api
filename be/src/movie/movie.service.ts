import { Body, Get, Injectable, NotFoundException, Query } from '@nestjs/common';
import { MovieQueryFilterDTO } from './dto/movieQueryFIlterDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import type { MovieDTO } from './dto/movieDTO';
import { CreateMovieDto } from './dto/createMovieDTO';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) { }

  async getAllMovies(query: MovieQueryFilterDTO) {
    return await this.prisma.movie.findMany({
      where: {
        name: {
          contains: query.search,
          mode: 'insensitive',
        },
        genres: query.genre ? {
          some: {
            name: query.genre,
          },
        } : undefined,
      },
      orderBy: query.sortBy ? {
        [query.sortBy]: 'asc',
      } : undefined,
      include: {
        genres: true,
        favorites: true,
      },
    }) as MovieDTO[];
  }

  async createMovie(movieData: CreateMovieDto) {
    const { name, description, year, rating, genres, length, imgURL } = movieData;
    const newMovie = await this.prisma.movie.create({
      data: {
        name,
        description,
        year,
        rating,
        length,
        imgURL,
        genres: {
          connectOrCreate: genres.map(genre => ({
            where: { name: genre.name },
            create: { name: genre.name },
          })),
        },
      },
      include: {
        genres: true,
      },
    });

    return newMovie as MovieDTO;
  }

  async deleteMovie(movieId: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException(`Film not found with ID ${movieId}`);
    }

    return await this.prisma.movie.delete({
      where: { id: movieId },
    });
  }

  async updateMovie(movieId: number, movieData: CreateMovieDto) {
    const { name, description, year, rating, genres, length, imgURL } = movieData;

    const existingMovie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      throw new NotFoundException(`Film not found with ID ${movieId}`);
    }

    const updatedMovie = await this.prisma.movie.update({
      where: { id: movieId },
      data: {
        name,
        description,
        year,
        rating,
        length,
        imgURL,
        genres: {
          set: genres.map(genre => ({
            name: genre.name,
          })),
        },
      },
      include: {
        genres: true,
      },
    });

    return updatedMovie as MovieDTO;
  }

  async getMovieById(movieId: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
      include: {
        genres: true,
        favorites: true,
      },
    });

    if (!movie) {
      throw new NotFoundException(`Movie not found with ID ${movieId}`);
    }

    return movie as MovieDTO;
  }
}
