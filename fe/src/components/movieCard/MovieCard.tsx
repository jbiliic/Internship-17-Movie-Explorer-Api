import { useState } from 'react';
import type { Movie } from '../../types/movie.ts';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes.ts';
import styles from './MovieCard.module.css';
interface MovieCardProps {
    movie: Movie;
    toggleFavourites?: (id: number) => Promise<boolean>;
}
export const MovieCard = ({ movie, toggleFavourites }: MovieCardProps) => {

    const [addedToFavs, setAddedToFavs] = useState(movie.isFavorite);
    const navigate = useNavigate();

    const handleAddToFavourites = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (toggleFavourites) {
            const response = await toggleFavourites(movie.id);
            if (!response) {
                alert("Failed to toggle favorite. Please try again.");
            } else {
                setAddedToFavs(prev => !prev);
            }
        }
    }
    return (
        <div className={styles.card} onClick={() => navigate(routes.MOVIE_DETAILS.replace(':id', movie.id.toString()), { state: { movie } })}>
            <h2 className={styles.title}>{movie.name}</h2>
            <p className={styles.desc}>{movie.description}</p>
            {toggleFavourites && (
                <button
                    className={`${styles.favBtn} ${addedToFavs ? styles.active : ''}`}
                    onClick={(e) => {
                        handleAddToFavourites(e);
                    }}
                />
            )}
        </div>
    );
}