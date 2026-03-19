import client from "./client";

export const deleteMovie = async (movieId: number) => {
    const [response, error] = await client.delete(`/movie/${movieId}`);
    if (error) {
        console.error('Error deleting movie:', error);
        return null;
    }
    return response;
};