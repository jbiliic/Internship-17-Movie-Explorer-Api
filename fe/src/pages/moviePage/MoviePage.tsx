import LoadingCircle from "../../components/loading/LoadingCircle";
import { MovieCard } from "../../components/movieCard/MovieCard";
import type { Movie } from "../../types/movie";
import { useNavigate } from "react-router-dom";
import styles from './MoviePage.module.css';
import { routes } from "../../constants/routes";
import { useEffect, useRef } from "react";
import { useLoadFilteredMovies } from "../../hooks/useLoadFilterMovies";
import { useLoadGenres } from "../../hooks/useLoadGenres";
import { useToggleFavs } from "../../hooks/useToggleFavs";
import { FilteringBtn } from "../../components/filteringBtn/FilteringBtn";

export const MoviePage = () => {
    const { genres, genresError, genresLoading } = useLoadGenres();
    const {
        setSearchQuery,
        isFiltering,
        filterError,
        searchQuery,
        movies,
        sortBy,
        setSortBy,
        setGenreFilter
    } = useLoadFilteredMovies();
    const searchBarFocusRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!isFiltering && !filterError) {
            searchBarFocusRef.current?.focus();
        }
    }, [isFiltering, filterError]);

    if (isFiltering) return <LoadingCircle />;
    if (filterError || genresError) return <div className="error">Error: {filterError || genresError}</div>;

    const toggleFavourites = (id: number) => {
        const movieToToggle = movies.find(m => m.id === id);
        if (movieToToggle) {
            movieToToggle.isFavorite = !movieToToggle.isFavorite;
            useToggleFavs(id);
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
                {genresLoading && <LoadingCircle />}
                {!genresLoading && (
                    <FilteringBtn
                        onChange={setGenreFilter}
                        options={genres.map(g => g.name) || []}
                    />
                )}
            </div>
            {isFiltering && <LoadingCircle />}
            {!isFiltering &&
                <div className={styles.grid}>
                    {movies.length === 0 ? (
                        <p className={styles.noMovies}>No movies found.</p>
                    ) : (
                        movies.map((movie: Movie) => (
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