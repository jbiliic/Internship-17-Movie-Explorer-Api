import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './entity/genre.entity';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller('genre')
export class GenreController {
    constructor(private readonly genreService: GenreService) { }

    @Get()
    @ApiOperation({ summary: 'Get all genres' })
    @ApiOkResponse({
        description: 'The list of genres has been successfully retrieved.',
        type: Genre,
        isArray: true
    })
    getGenres() {
        return this.genreService.getGenres();
    }
}
