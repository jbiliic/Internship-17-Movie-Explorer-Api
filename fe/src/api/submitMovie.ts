import { Navigate, useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";
import type { EditMovieDTO } from "../types/editMovieDTO";
import client from "./client";

export const submitMovie = async (movieData: EditMovieDTO) => {
    const navigate = useNavigate();
    if (movieData.id) {
        const { id, ...data } = movieData;

        const [response, error] = await client.put(`/movie/${id}`, data);
        if (error) {
            console.error('Error updating movie:', error);
            navigate(routes.ERROR, { state: { errorMessage: error } });
            return null;
        }
        return response;
    } else {
        const [response, error] = await client.post('/movie', movieData);
        if (error) {
            console.error('Error creating movie:', error);
            navigate(routes.ERROR, { state: { errorMessage: error } });
            return null;
        }
        return response;
    }
};