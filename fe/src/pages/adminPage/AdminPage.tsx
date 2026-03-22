import { useState } from "react";
import { MovieEditCard } from "../../components/movieEditCard/MovieEditCard";
import styles from "./AdminPage.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { useLoadFilteredMovies } from "../../hooks/useLoadFilterMovies";
import { routes } from "../../constants/routes";
import { useDeleteMovie } from "../../hooks/useDeleteMovie";
import { useSubmitMovie } from "../../hooks/useSubmitMovie";

export const AdminPage = () => {
    const [selectedDeleteId, setSelectedDeleteId] = useState<string>("");
    const deleteMovie = useDeleteMovie();
    const submitMovie = useSubmitMovie();
    const { setSearchQuery, isFiltering, filterError, searchQuery, movies } =
        useLoadFilteredMovies();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!selectedDeleteId) {
            alert("Please select a movie to delete.");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this movie?",
        );

        if (confirmDelete) {
            const res = await deleteMovie(Number(selectedDeleteId));

            if (res) {
                alert("Movie deleted successfully!");
                setSelectedDeleteId("");
                window.location.reload();
            } else {
                navigate(routes.ERROR, {
                    state: {
                        error: "Failed to delete movie. Try updating your credentials.",
                    },
                });
            }
        }
    };

    if (filterError)
        return <Navigate to={routes.ERROR} state={{ error: filterError }} />;

    return (
        <div className={styles.container}>
            <div className={styles.contentColumn}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    ← Go Back
                </button>

                <header className={styles.header}>
                    <h1>Admin Dashboard</h1>
                    <p>Manage your movie database from one place.</p>
                </header>

                <section className={styles.cardWrapper}>
                    <MovieEditCard
                        needsSelecting={false}
                        title="Add New Movie"
                        onSubmit={submitMovie}
                    />
                </section>

                <section className={styles.cardWrapper}>
                    <MovieEditCard
                        needsSelecting={true}
                        title="Edit Existing Movie"
                        onSubmit={submitMovie}
                    />
                </section>

                <section className={styles.cardWrapper}>
                    <h2>Delete Movie</h2>
                    <div className={styles.deleteSection}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for movie to delete..."
                            className={styles.input}
                        />
                        <select
                            name="movieId"
                            required
                            className={styles.select}
                            value={selectedDeleteId}
                            onChange={(e) =>
                                setSelectedDeleteId(e.target.value)
                            }
                        >
                            <option value="">
                                -- Select a movie to delete --
                            </option>
                            {movies.length === 0 && !isFiltering && (
                                <option value="">No movies found</option>
                            )}
                            {movies.map((m: Movie) => (
                                <option key={m.id} value={m.id}>
                                    {m.name} ({m.year})
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={handleDelete}
                            disabled={!selectedDeleteId}
                        >
                            Delete Movie
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};
