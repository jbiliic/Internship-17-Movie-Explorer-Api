import { useCallback } from "react"
import client from "../api/client";

export const useToggleFavs = () => {
    const toggleFav = useCallback(async (movieId: number) => {
        const finalUrl = '/favorite/toggle/:id'.replace(':id', movieId.toString());
        console.log("SENDING REQUEST TO:", finalUrl); // <--- CHECK BROWSER CONSOLE

        const [res, err] = await client.put(finalUrl);
        console.log("Response from toggleFav:", res, err); // <--- CHECK BROWSER CONSOLE
        if (err) {
            console.error("Error toggling favorite:", err);
            return -1;
        }
        return 1

    }, []);
    return { toggleFav };
}