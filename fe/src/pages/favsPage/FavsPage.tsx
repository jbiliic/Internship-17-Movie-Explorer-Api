import styles from './FavsPage.module.css';
import { MovieCard } from "../../components/movieCard/MovieCard";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { useLoadFavs } from "../../hooks/useLoadFavs";
import { useState } from "react";

export const FavsPage = () => {
    const { favs, favsError, favsLoading } = useLoadFavs();
    const [displayedFavs, setDisplayedFavs] = useState<Movie[]>(favs);

    const navigate = useNavigate();

    if (favsError) return <div className="error">Error: {favsError}</div>;

    const toggleFavorite = (id: number) => {
        const updatedFavs: Movie[] = displayedFavs.map(movie => {
            if (movie.id === id) {
                return { ...movie, isFavorite: !movie.isFavorite };
            }
            return movie;
        });
        setDisplayedFavs(updatedFavs);
    }

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                Back
            </button>
            <div className={styles.grid}>
                {favsLoading ? (
                    <p className={styles.noFavorites}>Loading favorite movies...</p>
                ) : displayedFavs.length === 0 ? (
                    <p className={styles.noFavorites}>No favorite movies yet.</p>
                ) : (
                    displayedFavs.map((movie: Movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            toggleFavourites={() => toggleFavorite(movie.id)}
                        />
                    )
                    )
                )
                }
            </div>
        </div>
    );
}