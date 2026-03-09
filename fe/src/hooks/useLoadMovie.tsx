import { useEffect, useState } from "react"
import { getMovieById } from "../constants/data";
import type { Movie } from "../types/movie";

export const useLoadMovie = (id?: string) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const parsedId = parseInt(id || '');
                if (isNaN(parsedId)) 
                    throw new Error('Invalid movie ID');
                const data = await getMovieById(parsedId);
                setMovie(data || null);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load movie');
            }
            finally{
                setLoading(false);
            }
        }
        fetchMovie();
    }, [id]);
    console.log('useLoadMovie - movie:', movie, 'loading:', loading, 'error:', error);
    return { movie, loading, error };
}