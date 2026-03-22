import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";
import type { EditMovieDTO } from "../types/editMovieDTO";
import client from "../api/client";

export const useSubmitMovie = () => {
    const navigate = useNavigate();

    const submitMovie = async (movieData: EditMovieDTO) => {
        if (movieData.id) {
            const { id, ...data } = movieData;

            const [response, error] = await client.put(`/movie/${id}`, data);

            if (error) {
                console.error("Error updating movie:", error);
                navigate(routes.ERROR, { state: { error: error } });
                return null;
            }
            return response;
        } else {
            const [response, error] = await client.post("/movie", movieData);

            if (error) {
                console.error("Error creating movie:", error);
                navigate(routes.ERROR, { state: { error: error } });
                return null;
            }
            return response;
        }
    };

    return submitMovie;
};
