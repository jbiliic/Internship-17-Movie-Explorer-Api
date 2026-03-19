import { useLoadFilteredMovies } from "../../hooks/useLoadFilterMovies";
import { useLoadGenres } from "../../hooks/useLoadGenres";
import type { Genre } from "../../types/genre";
import type { Movie } from "../../types/movie";
import type { EditMovieDTO } from "../../types/editMovieDTO";

interface MovieEditCardProps {
    needsSelecting: boolean;
    title: string;
    onSubmit: (movieData: EditMovieDTO) => void;
}

export const MovieEditCard = ({ needsSelecting, title, onSubmit }: MovieEditCardProps) => {
    const { genres, genresError, genresLoading } = useLoadGenres();

    const {
        setSearchQuery,
        isFiltering,
        filterError,
        searchQuery,
        movies
    } = useLoadFilteredMovies();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const formProps = Object.fromEntries(data);

        onSubmit(formProps as unknown as EditMovieDTO);
    }

    if (genresError || filterError) return <div className="error">Error: {genresError || filterError}</div>;
    if (genresLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2>{title}</h2>
            <form onSubmit={submitHandler}>
                {needsSelecting && (
                    <>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                        />

                        <select name="movieId" required>
                            {!isFiltering && movies
                                .map((m: Movie) => (
                                    <option key={m.id} value={m.id}>
                                        {m.name},{m.description},{m.year}
                                    </option>
                                ))}
                        </select>
                    </>
                )}
                <input type="text" name="name" placeholder="Title" />
                <input type="text" name="description" placeholder="Description" />
                <input type="text" name="length" placeholder="Duration" />
                <input type="number" name="rating" placeholder="Rating" />
                <input type="number" name="year" placeholder="Year" />
                <select name="genreIds" multiple required>
                    {genres.map((genre: Genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                <input type="text" name="imageURL" placeholder="Image URL" />
                <button type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    );
}