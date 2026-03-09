import { useFavorites } from "../../context/FavsContext"
import styles from './FavsPage.module.css';
import { MovieCard } from "../../components/movieCard/MovieCard";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";

export const FavsPage = () => {
    const { favorites, toggleFavorite } = useFavorites();

    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                Back
            </button>
            <div className={styles.grid}>
                {favorites.length === 0 ? (
                    <p className={styles.noFavorites}>No favorite movies yet.</p>
                ) : (
                    favorites.map((movie: Movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            toggleFavourites={() => toggleFavorite(movie)}
                        />
                    )
                    )
                )
                }
            </div>
        </div>
    );
}