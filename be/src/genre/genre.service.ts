import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenreDTO } from './dto/genreDTO';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) { }

  async getGenres() {
    return await this.prisma.genre.findMany() as GenreDTO[];
  }

}
