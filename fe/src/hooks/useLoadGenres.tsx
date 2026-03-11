import { useEffect, useState } from "react";
import type { Genre } from "../types/genre";
import client from "../api/client";

export const useLoadGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genresError, setGenresError] = useState<string | null>(null);
    const [genresLoading, setGenresLoading] = useState<boolean>(false);

    const fetchGenres = async () => {
        setGenresLoading(true);
        setGenresError(null);

        const [res, err] = await client.get('/genres');

        if (err) {
            setGenresError(err);
            setGenres([]);
            return;
        }

        setGenres(res);
        setGenresLoading(false);
    }

    useEffect(() => {
        fetchGenres();
    }, []);

    return { genres, genresError, genresLoading };

}