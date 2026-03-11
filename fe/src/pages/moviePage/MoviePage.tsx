import LoadingCircle from "../../components/loading/LoadingCircle";
import { MovieCard } from "../../components/movieCard/MovieCard";
import type { Movie } from "../../types/movie";
import { useNavigate } from "react-router-dom";
import styles from './MoviePage.module.css';
import { useFavorites } from "../../context/FavsContext";
import { routes } from "../../constants/routes";
import { useEffect, useRef } from "react";

export const MoviePage = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const searchBarFocusRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!loading && !error) {
            searchBarFocusRef.current?.focus();
        }
    }, [loading, error]);

    if (loading) return <LoadingCircle />;
    if (error) return <div className="error">Error: {error}</div>;

    const toggleFavourites = (id: number) => {
        const movieToToggle = movies.find(m => m.id === id);
        if (movieToToggle) {
            toggleFavorite(movieToToggle);
        }
    }

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(routes.MAIN)}>
                Back
            </button>
            <div>
                <div className={styles.controls}>
                    <input
                        ref={searchBarFocusRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                    />
                    <div className={styles.sortContainer}>
                        <label htmlFor="movie-sort" className={styles.sortLabel}>
                            Sortiraj po:
                        </label>
                        <select
                            id="movie-sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={styles.sortSelect}
                        >
                            <option value="name">Imenu (A-Z)</option>
                            <option value="releaseDate">Datumu izlaska</option>
                            <option value="rating">Ocjeni</option>
                        </select>
                    </div>
                </div>
            </div>
            {isFiltering && <LoadingCircle />}
            {!isFiltering &&
                <div className={styles.grid}>
                    {filteredMovies.length === 0 ? (
                        <p className={styles.noMovies}>No movies found.</p>
                    ) : (
                        filteredMovies.map((movie: Movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                toggleFavourites={toggleFavourites}
                            />
                        )))}
                </div>}
        </div>
    );
}