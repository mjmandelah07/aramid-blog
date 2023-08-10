import { useState, useEffect } from "react";

const useFetchAvatar = (authorNames) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const avatarPromises = authorNames.map(async (authorName) => {
          const response = await fetch(
            `https://ui-avatars.com/api/?name=${authorName}&background=0D8ABC&color=fff`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch avatar");
          }
          const blob = await response.blob();
          const avatarUrl = URL.createObjectURL(blob);
          return avatarUrl;
        });

        const avatarUrls = await Promise.all(avatarPromises);
        setAvatars(avatarUrls);
      } catch (error) {
        console.error(error);
      }
    };

    if (Array.isArray(authorNames) && authorNames.length > 0) {
      fetchAvatars();
    }
  }, [authorNames]);

  return avatars;
};

export default useFetchAvatar;
