import { Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Movie } from 'src/movie/entity/movie.entity';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/guards/userGuard';

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
	@UseGuards(UserGuard)
	getFavorites(@Req() req: any) {
		return this.favoriteService.getFavorites(req.user.userId as number);
	}

	@Put('/toggle/:movieId')
	@ApiOperation({ summary: 'Toggle favorite status of a movie' })
	@ApiOkResponse({
		description: 'Favorite status toggled successfully.',
	})
	@UseGuards(UserGuard)
	toggleFavorite(@Param('movieId') movieId: string, @Req() req: any) {
		return this.favoriteService.toggleFavorite(movieId, req.user.userId as number);
	}
}
