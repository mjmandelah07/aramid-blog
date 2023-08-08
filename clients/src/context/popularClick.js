 export const getMostClickedPosts = (jsonData, limit = 5) => {
    // Sort the posts based on clickCount in descending order
    const sortedPosts = jsonData.articles.sort((a, b) => b.clickCount - a.clickCount);
  
    // Take only the top `limit` posts
    const mostClickedPosts = sortedPosts.slice(0, limit);
  
    return mostClickedPosts;
  };
  