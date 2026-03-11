import { useCallback } from "react"
import client from "../api/client";

export const useToggleFavs = (Id: number) => {
    const toggleFav = useCallback(async () => {
        const [res, err] = await client.put('/favorites/toggle/:id'.replace(':id', Id.toString()));

        if (err) {
            console.error("Error toggling favorite:", err);
            return -1;
        }
        return 1

    }, [Id]);
    return { toggleFav };
}