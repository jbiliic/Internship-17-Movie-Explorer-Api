import styles from './FavsPage.module.css';
import { MovieCard } from "../../components/movieCard/MovieCard";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { useLoadFavs } from "../../hooks/useLoadFavs";
import { useToggleFavs } from '../../hooks/useToggleFavs';

export const FavsPage = () => {
    const { favs, setFavs, favsError, favsLoading } = useLoadFavs();
    const { toggleFav } = useToggleFavs();

    const navigate = useNavigate();

    if (favsError) return <div className="error">Error: {favsError}</div>;

    const toggleFavourites = (id: number) => {
        const movieToToggle = favs.find(m => m.id === id);
        if (movieToToggle) {
            movieToToggle.isFavorite = !movieToToggle.isFavorite;
            console.log("Calling hook now... with id ", id);
            toggleFav(id);
            setFavs(prevFavs => prevFavs.map(m => m.id === id ? { ...m, isFavorite: movieToToggle.isFavorite } : m));
        }
    }

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                Back
            </button>
            <div className={styles.grid}>
                {favsLoading ? (
                    <p className={styles.noFavorites}>Loading favorite movies...</p>
                ) : favs.length === 0 ? (
                    <p className={styles.noFavorites}>No favorite movies yet.</p>
                ) : (
                    favs.map((movie: Movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            toggleFavourites={() => toggleFavourites(movie.id)}
                        />
                    )
                    )
                )
                }
            </div>
        </div>
    );
}