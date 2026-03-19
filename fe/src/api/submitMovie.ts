import type { EditMovieDTO } from "../types/editMovieDTO";
import client from "./client";

export const submitMovie = async (movieData: EditMovieDTO) => {
    if (movieData.id) {
        const { id, ...data } = movieData; // 🔥 REMOVE ID FROM BODY

        const [response, error] = await client.put(`/movie/${id}`, data);
        if (error) {
            console.error('Error updating movie:', error);
            return null;
        }
        return response;
    } else {
        const [response, error] = await client.post('/movie', movieData);
        if (error) {
            console.error('Error creating movie:', error);
            return null;
        }
        return response;
    }
};