export interface Movie {
  id: number;       
  name: string;
  description: string;
  genre: "Action" | "Sci-Fi" | "Drama" | "Crime" | "Adventure" | "Horror" | "Animation" | "Biography";
  length: string;     
  rating: number;     
  year: number;
  isFavourite: boolean;
  imgURL: string;
}