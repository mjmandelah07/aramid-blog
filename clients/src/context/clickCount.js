import { useCallback } from "react";
import axios from "axios";

export function useIncrementClickCount() {
  const apiUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const incrementClickCount = useCallback(
    async (postId) => {
      try {
        const userClicked = true;
        if (userClicked) {
          await axios.post(
            `${apiUrl}/articles/articles/increment-click/${postId}`
          );
        }
      } catch (error) {
        console.error("Error incrementing click count:", error);
      }
    },
    [apiUrl]
  );

  return incrementClickCount;
}
