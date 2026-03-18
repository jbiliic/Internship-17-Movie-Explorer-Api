import { useState, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import type { Movie } from "../types/movie";
import client from "../api/client";

export const useLoadFilteredMovies = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch] = useDebounceValue(searchQuery, 700);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filterError, setFilterError] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState("name");
    const [genreFilter, setGenreFilter] = useState<string | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (searchQuery !== debouncedSearch) {
            setIsFiltering(true);
        } else {
            setIsFiltering(false);
        }
    }, [searchQuery, debouncedSearch]);

    const loadMovies = async () => {
        setIsFiltering(true);
        setFilterError(null);

        const [res, err] = await client.get('/movie', {
            params: {
                search: debouncedSearch,
                sortBy: sortBy,
                genre: genreFilter
            }
        });

        if (err) {
            setFilterError(err);
            setMovies([]);
            setIsFiltering(false);
            return;
        }

        setMovies(res);
        setIsFiltering(false);

    };

    useEffect(() => {
        loadMovies();
    }, [debouncedSearch, sortBy, genreFilter]);

    return {
        setSearchQuery,
        searchQuery,
        isFiltering,
        filterError,
        movies,
        sortBy,
        setSortBy,
        setGenreFilter
    };
};