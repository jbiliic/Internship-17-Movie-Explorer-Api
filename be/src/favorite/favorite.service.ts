import { Injectable } from '@nestjs/common';
import { MovieDTO } from 'src/movie/dto/movieDTO';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
    constructor(private prisma: PrismaService) { }

    async getFavorites(userId: number) {

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const movies = await this.prisma.movie.findMany({
            where: { favorites: { some: { userId } } },
            include: {
                genres: true,
                favorites: true,
            }
        });

        return movies.map(movie => ({
            ...movie,
            isFavorite: movie.favorites.some(f => f.userId === userId)
        })) as MovieDTO[];
    }

    async toggleFavorite(movieId: string, userId: number) {
        const movieIdNum = parseInt(movieId, 10);
        if (isNaN(movieIdNum)) {
            throw new Error('Invalid movieId');
        }

        const movie = await this.prisma.movie.findUnique({
            where: { id: movieIdNum },
        });

        if (!movie) {
            throw new Error('Movie not found');
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const existingFavorite = await this.prisma.favorite.findFirst({
            where: {
                movieId: movieIdNum,
                userId,
            }
        });

        if (existingFavorite) {
            await this.prisma.favorite.delete({
                where: {
                    id: existingFavorite.id
                }
            });
            return { message: 'Movie removed from favorites' };
        } else {
            await this.prisma.favorite.create({
                data: {
                    movieId: movieIdNum,
                    userId,
                }
            });
            return { message: 'Movie added to favorites' };
        }
    }
}
