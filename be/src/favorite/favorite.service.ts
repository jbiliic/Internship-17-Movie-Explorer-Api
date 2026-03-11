import { Injectable } from '@nestjs/common';
import { MovieDTO } from 'src/movie/dto/movieDTO';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
    constructor(private prisma: PrismaService) { }

    async getFavorites() {
        return await this.prisma.movie.findMany({
            where: {
                favorite: {
                    isNot: null
                }
            },
            include: {
                genres: true
            }
        }) as MovieDTO[];
    }

    async toggleFavorite(Id: string) {
        if (!Number.isInteger(Number(Id))) {
            return { message: 'Invalid movie ID' };
        }
        const movieId = Number(Id);

        const existingFavorite = await this.prisma.favorite.findUnique({
            where: {
                movieId: movieId
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
                    movieId: movieId
                }
            });
            return { message: 'Movie added to favorites' };
        }
    }
}
