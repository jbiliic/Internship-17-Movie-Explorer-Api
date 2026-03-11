import { type Genre } from "./genre";

export interface Movie {
    id: number;
    name: string;
    description: string;
    genres: Genre[];
    length: string;
    rating: number;
    year: number;
    imgURL: string;
    isFavorite?: boolean;
}