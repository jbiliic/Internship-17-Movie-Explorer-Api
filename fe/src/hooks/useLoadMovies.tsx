import { useEffect, useState } from "react"
import { getMovies } from "../constants/data";
import type { Movie } from "../types/movie";

export const useLoadMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies();
                setMovies(data);
            }
            catch (err) {
                setError('Failed to load movies');
            }
            finally{
                setLoading(false);
            }
        }
        fetchMovies();
    }, [])
    return { movies, loading, error };
}