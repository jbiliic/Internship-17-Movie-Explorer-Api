import type { Movie } from "../../types/movie.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./MovieDetails.module.css";
import { routes } from "../../constants/routes.ts";
import { useLocation } from "react-router-dom";

export const MovieDetails = () => {
    const [displayedMovie, setDisplayedMovie] = useState<Movie | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const movie = location.state?.movie as Movie | undefined;
        if (!movie) {
            navigate(routes.NO_PAGE_FOUND);
        } else {
            setDisplayedMovie(movie);
        }
    }, [location.state, navigate]);

    return (
        <div className={styles.container}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                Back
            </button>

            {displayedMovie && (
                <div className={styles.contentBox}>
                    <div className={styles.imageContainer}>
                        <img
                            src={displayedMovie.imgURL}
                            alt={displayedMovie.name}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.details}>
                        <h1 className={styles.header}>{displayedMovie.name}</h1>
                        <p className={styles.content}>
                            {displayedMovie.description}
                        </p>

                        <div className={styles.meta}>
                            <div className={styles.metaItem}>
                                <span className={styles.label}>Rating</span>
                                <span className={styles.value}>
                                    {displayedMovie.rating}
                                </span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.label}>Year</span>
                                <span className={styles.value}>
                                    {displayedMovie.year}
                                </span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.label}>Genres</span>
                                {displayedMovie.genres.map((g) => (
                                    <span key={g.id} className={styles.genre}>
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.label}>Length</span>
                                <span className={styles.value}>
                                    {displayedMovie.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
