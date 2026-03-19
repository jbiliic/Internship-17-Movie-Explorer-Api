import { Body, Get, Injectable, NotFoundException, Query } from '@nestjs/common';
import { MovieQueryFilterDTO } from './dto/movieQueryFIlterDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import type { MovieDTO } from './dto/movieDTO';
import { CreateMovieDto } from './dto/createMovieDTO';

@Injectable()
export class MovieService {
    constructor(private prisma: PrismaService) { }

    async getAllMovies(query: MovieQueryFilterDTO, userId: number | null) {
        let movies = await this.prisma.movie.findMany({
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
            }
        }) as MovieDTO[];


        movies = movies.map((movie) => ({
            ...movie,
            isFavorite: userId
                ? movie.favorites?.some((f) => f.userId === userId)
                : false,
        })) as MovieDTO[];

        return movies;
    }

    async createMovie(movieData: CreateMovieDto) {
        const { id, ...safeData } = movieData as any; // strip id if present

        return await this.prisma.movie.create({
            data: {
                ...safeData,
                genres: {
                    connect: safeData.genres.map((id: number) => ({ id })),
                },
            },
            include: { genres: true },
        });
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
                    set: genres.map((id: number) => ({ id })),
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
