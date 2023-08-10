import { useCallback } from 'react';
import axios from 'axios';

export function useIncrementClickCount() {
  const incrementClickCount = useCallback(async (postId) => {
    try {
      const userClicked = true; 
      if (userClicked) {
        await axios.post(`https://aramid-blog.onrender.com/api/articles/increment-click/${postId}`);
      }
    } catch (error) {
      console.error('Error incrementing click count:', error);
    }
  }, []);

  return incrementClickCount;
}
