import { GenreDTO } from "../../genre/dto/genreDTO";
import { FavoriteDTO } from "../../favorite/dto/favoriteDTO";

export interface MovieDTO {
    id: number;
    name: string;
    description: string;
    releaseYear: number;
    rating: number;
    length: string;
    imgUrl: string;

    genres: GenreDTO[];
    favorite?: FavoriteDTO | null;
}
