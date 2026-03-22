import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";
import client from "../api/client";

export const useDeleteMovie = () => {
    const navigate = useNavigate();

    const deleteMovie = async (movieId: number) => {
        const [response, error] = await client.delete(`/movie/${movieId}`);
        if (error) {
            navigate(routes.ERROR, { state: { errorMessage: error } });
            return null;
        }
        return response;
    };

    return deleteMovie;
};
