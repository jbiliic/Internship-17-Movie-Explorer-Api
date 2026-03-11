import { Get, Injectable, Query } from '@nestjs/common';
import { MovieQueryFilterDTO } from './dto/movieQueryFIlterDTO';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) { }

  getAllMovies(@Query() query: MovieQueryFilterDTO) {
    return this.prisma.movie.findMany({
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
    });
  }
}
