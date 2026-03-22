import styles from "./FavsPage.module.css";
import { MovieCard } from "../../components/movieCard/MovieCard";
import { Navigate, useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { useLoadFavs } from "../../hooks/useLoadFavs";
import { useToggleFavs } from "../../hooks/useToggleFavs";
import { routes } from "../../constants/routes";

export const FavsPage = () => {
    const { favs, setFavs, favsError, favsLoading } = useLoadFavs();
    const { toggleFav } = useToggleFavs();

    const navigate = useNavigate();

    if (favsError) {
        console.error("Error loading favorite movies:", favsError);
        return <Navigate to={routes.ERROR} state={{ error: favsError }} />;
    }
    const toggleFavourites = async (id: number) => {
        const response = await toggleFav(id);
        if (!response) {
            return false;
        } else {
            const updatedMovie = favs.find((f) => f.id === id);
            if (updatedMovie) {
                updatedMovie.isFavorite = !updatedMovie.isFavorite;
            }
            return true;
        }
    };

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                Back
            </button>
            <div className={styles.grid}>
                {favsLoading ? (
                    <p className={styles.noFavorites}>
                        Loading favorite movies...
                    </p>
                ) : favs.length === 0 ? (
                    <p className={styles.noFavorites}>
                        No favorite movies yet.
                    </p>
                ) : (
                    favs.map((movie: Movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            toggleFavourites={() => toggleFavourites(movie.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
