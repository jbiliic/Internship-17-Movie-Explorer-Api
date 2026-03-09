import type { Movie } from '../../types/movie.ts';
import { useLoadMovie } from '../../hooks/useLoadMovie.tsx';
import { useParams } from 'react-router-dom';
import LoadingCircle from '../../components/loading/LoadingCircle.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './MovieDetails.module.css';
import { routes } from '../../constants/routes.ts';
export const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { movie, loading, error } = useLoadMovie(id);
    const [displayedMovie, setDisplayedMovie] = useState<Movie | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !movie && !error) 
            navigate(routes.NO_PAGE_FOUND);
        if (movie) 
            setDisplayedMovie(movie);
    }, [movie, loading, error, navigate]);

    if (loading) return <LoadingCircle />;
    if (error) return <div className="error">Error: {error}</div>;
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
                    <p className={styles.content}>{displayedMovie.description}</p>

                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>Rating</span>
                            <span className={styles.value}>{displayedMovie.rating}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>Year</span>
                            <span className={styles.value}>{displayedMovie.year}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>Genre</span>
                            <span className={styles.value}>{displayedMovie.genre}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>Length</span>
                            <span className={styles.value}>{displayedMovie.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);
}