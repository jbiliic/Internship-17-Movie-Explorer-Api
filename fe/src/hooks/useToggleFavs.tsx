import { useCallback } from "react"
import client from "../api/client";

export const useToggleFavs = () => {
    const toggleFav = useCallback(async (movieId: number) => {
        const finalUrl = '/favorite/toggle/:id'.replace(':id', movieId.toString());

        const [res, err] = await client.put(finalUrl);
        if (err) {
            console.error("Error toggling favorite:", err);
            return null;
        }
        return res;

    }, []);
    return { toggleFav };
}