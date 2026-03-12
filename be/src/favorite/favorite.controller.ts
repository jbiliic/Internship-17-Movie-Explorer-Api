import { Controller, Get, Param, Put } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Movie } from 'src/movie/entity/movie.entity';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('favorite')
export class FavoriteController {
	constructor(private readonly favoriteService: FavoriteService) { }

	@Get()
	@ApiOperation({ summary: 'Get all favorite movies' })
	@ApiOkResponse({
		description: 'The list of favorite movies has been successfully retrieved.',
		type: Movie,
		isArray: true
	})
	getFavorites() {
		return this.favoriteService.getFavorites();
	}

	@Put('/toggle/:movieId')
	@ApiOperation({ summary: 'Toggle favorite status of a movie' })
	@ApiOkResponse({
		description: 'Favorite status toggled successfully.',
	})
	toggleFavorite(@Param('movieId') movieId: string) {
		return this.favoriteService.toggleFavorite(movieId);
	}
}
