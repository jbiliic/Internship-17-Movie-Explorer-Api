export interface EditMovieDTO {
    id?: number;
    name: string;
    description: string;
    genres: number[];
    length: string;
    rating: number;
    year: number;
    imgURL: string;
}