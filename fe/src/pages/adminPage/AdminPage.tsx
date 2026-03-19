import { MovieEditCard } from "../../components/movieEditCard/MovieEditCard";
import { submitMovie } from "../../api/submitMovie";

export const AdminPage = () => {
    return (
        <div>
            <MovieEditCard
                needsSelecting={false}
                title="Add Movie"
                onSubmit={submitMovie}
            />

            <MovieEditCard
                needsSelecting={true}
                title="Edit Movie"
                onSubmit={submitMovie}
            />
        </div>
    );
};
