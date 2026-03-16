import { Injectable } from '@nestjs/common';
import { MovieDTO } from 'src/movie/dto/movieDTO';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
    constructor(private prisma: PrismaService) { }

    async getFavorites(userId: number) {
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

    async toggleFavorite(Id: string, userId: number) {
        console.log("Toggling favorite for movie ID:", Id);
        if (!Number.isInteger(Number(Id))) {
            return { message: 'Invalid movie ID' };
        }
        const movieId = Number(Id);

        const existingFavorite = await this.prisma.favorite.findFirst({
            where: {
                movieId,
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
                    movieId,
                    userId,
                }
            });
            return { message: 'Movie added to favorites' };
        }
    }
}
