import { createContext, useState, useContext, type ReactNode } from 'react';
import type { Movie } from '../types/movie';

interface FavoritesContextType {
    favorites: Movie[];
    toggleFavorite: (movie: Movie) => void;
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    const toggleFavorite = (movie: Movie) => {
        setFavorites((prev) => {
            const exists = prev.find((m) => m.id === movie.id);
            if (exists) {
                return prev.filter((m) => m.id !== movie.id);
            }
            return [...prev, movie];
        });
    };
    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};