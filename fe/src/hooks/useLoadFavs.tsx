import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import client from "../api/client";

export const useLoadFavs = () => {
    let favs: Movie[] = [];
    const [favsError, setFavsError] = useState<string | null>(null);
    const [favsLoading, setFavsLoading] = useState<boolean>(false);


    const fetchFavs = async () => {
        setFavsError(null);
        setFavsLoading(true);

        const [res, err] = await client.get('/favorite');

        if (err) {
            setFavsError(err);
            setFavsLoading(false);
            return;
        }

        favs = res;
        setFavsLoading(false);
    }

    useEffect(() => {
        fetchFavs();
    }, []);

    return { favs, favsError, favsLoading };

};