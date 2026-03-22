import { useLoadFilteredMovies } from "../../hooks/useLoadFilterMovies";
import { useLoadGenres } from "../../hooks/useLoadGenres";
import type { Genre } from "../../types/genre";
import type { Movie } from "../../types/movie";
import type { EditMovieDTO } from "../../types/editMovieDTO";
import styles from "./MovieEditCard.module.css";
import { Navigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import LoadingCircle from "../loading/LoadingCircle";

interface MovieEditCardProps {
    needsSelecting: boolean;
    title: string;
    onSubmit: (movieData: EditMovieDTO) => void;
}

export const MovieEditCard = ({
    needsSelecting,
    title,
    onSubmit,
}: MovieEditCardProps) => {
    const { genres, genresError, genresLoading } = useLoadGenres();

    const { setSearchQuery, isFiltering, filterError, searchQuery, movies } =
        useLoadFilteredMovies();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const selectedGenres = formData
            .getAll("genres")
            .map((id) => Number(id));

        const movieId = formData.get("movieId");

        const moviePayload = {
            id: movieId ? Number(movieId) : undefined, // 🔥 THIS FIXES EVERYTHING
            name: String(formData.get("name")),
            description: String(formData.get("description")),
            length: String(formData.get("length")),
            year: Number(formData.get("year")),
            rating: Number(formData.get("rating")),
            imgURL: String(formData.get("imgURL")),
            genres: selectedGenres,
        };

        onSubmit(moviePayload as EditMovieDTO);
    };

    if (genresError || filterError)
        return (
            <Navigate
                to={routes.ERROR}
                state={{ error: genresError || filterError }}
            />
        );
    if (genresLoading) return <LoadingCircle></LoadingCircle>;

    return (
        <div className={styles.card}>
            <h2>{title}</h2>
            <form className={styles.form} onSubmit={submitHandler}>
                {needsSelecting && (
                    <>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className={styles.input}
                        />

                        <select
                            name="movieId"
                            required
                            className={styles.select}
                        >
                            {!isFiltering &&
                                movies.map((m: Movie) => (
                                    <option key={m.id} value={m.id}>
                                        {m.name},{m.description},{m.year}
                                    </option>
                                ))}
                        </select>
                    </>
                )}
                <input
                    type="text"
                    name="name"
                    placeholder="Title"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="length"
                    placeholder="Duration"
                    className={styles.input}
                />
                <input
                    type="decimal"
                    name="rating"
                    placeholder="Rating"
                    className={styles.input}
                />
                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    className={styles.input}
                />
                <select
                    name="genres"
                    multiple
                    required
                    className={styles.select}
                >
                    {genres.map((genre: Genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="imgURL"
                    placeholder="Image URL"
                    className={styles.input}
                />
                <button type="submit" className={styles.submitBtn}>
                    Submit
                </button>
            </form>
        </div>
    );
};
