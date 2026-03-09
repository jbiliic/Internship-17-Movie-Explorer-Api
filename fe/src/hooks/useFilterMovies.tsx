import { useState, useMemo, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import type { Movie } from "../types/movie";
export const useFilteredMovies = (movies: Movie[] | null, favorites: Movie[]) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch] = useDebounceValue(searchQuery, 300);
    const [isFiltering, setIsFiltering] = useState(false);
    const [sortBy,setSortBy] = useState("name");

    useEffect(() => {
        if (searchQuery !== debouncedSearch) {
            setIsFiltering(true);
        } else {
            setIsFiltering(false);
        }
    }, [searchQuery, debouncedSearch]);

    const filteredMovies = useMemo(() => {
        if (!movies) return [];
        return movies
            .filter((movie) => {
                const matchesSearch = movie.name
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase());
                return matchesSearch;
            })
            .map((movie) => ({
                ...movie,
                isFavourite: favorites.some((fav) => fav.id === movie.id),
            }))
            .sort((a : Movie, b : Movie) => {
                if (sortBy === "name") {
                    return a.name.localeCompare(b.name);
                } else if (sortBy === "releaseDate") {
                    return new Date(b.year).getTime() - new Date(a.year).getTime();
                }else if (sortBy === "rating") {
                    return b.rating - a.rating;
                }
                return -1;
            });

    }, [movies, favorites, debouncedSearch, sortBy]);

    return {
        searchQuery,
        setSearchQuery,
        filteredMovies,
        isFiltering, 
        sortBy,
        setSortBy
    };
};