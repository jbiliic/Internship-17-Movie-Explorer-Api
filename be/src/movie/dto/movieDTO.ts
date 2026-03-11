import { GenreDTO } from "../../genre/dto/genreDTO";
import { FavoriteDTO } from "../../favorite/dto/favoriteDTO";

export interface MovieDTO {
    id: number;
    name: string;
    description: string;
    year: number;
    rating: number;
    length: string;
    imgURL: string;

    genres: GenreDTO[];
    favorite?: FavoriteDTO | null;
}