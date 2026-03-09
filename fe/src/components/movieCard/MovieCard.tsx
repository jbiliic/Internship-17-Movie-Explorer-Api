import { useState } from 'react';
import type { Movie } from '../../types/movie.ts';
import { useNavigate } from 'react-router-dom';
import {routes} from '../../constants/routes.ts';
import styles from'./MovieCard.module.css';
interface MovieCardProps {
    movie: Movie;
    toggleFavourites?: (id: number) => void;
}
export const MovieCard = ({ movie, toggleFavourites }: MovieCardProps) => {
    const [addedToFavs, setAddedToFavs] = useState(movie.isFavourite);
    const navigate = useNavigate();
    const handleAddToFavourites = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAddedToFavs(!addedToFavs);
        if(toggleFavourites)
            toggleFavourites(movie.id);
    }
    return (
        <div className={styles.card} onClick={() => navigate(routes.MOVIE_DETAILS.replace(':id', movie.id.toString()))}>
            <h2 className={styles.title}>{movie.name}</h2>
            <p className={styles.desc}>{movie.description}</p>
            {toggleFavourites && (
                <button 
                    className={`${styles.favBtn} ${addedToFavs? styles.active : ''}`} 
                    onClick={(e) => {
                        handleAddToFavourites(e);
                    }}
                />
            )}
        </div>
    );
}