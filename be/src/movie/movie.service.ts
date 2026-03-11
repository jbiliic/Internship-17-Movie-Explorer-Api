import { Get, Injectable, Query } from '@nestjs/common';
import { MovieQueryFilterDTO } from './dto/movieQueryFIlterDTO';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDTO } from './dto/movieDTO';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) { }

  async getAllMovies(@Query() query: MovieQueryFilterDTO) {
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
    }) as MovieDTO[];
  }
}
