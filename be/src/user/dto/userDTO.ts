import { FavoriteDTO } from '../../favorite/dto/favoriteDTO';

export interface UserDTO {
    id: number;
    email: string;
    password: string;
    name: string;
    isAdmin: boolean;
    favorites?: FavoriteDTO[];
}
