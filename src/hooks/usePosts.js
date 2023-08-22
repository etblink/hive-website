import { useState, useEffect } from "react";
import { getUserAccount, fetchBlogPosts, fetchRecentPosts } from "../hive";
import getFirstImageUrl from "../utils/getFirstImageUrl";

// Custom hook to fetch posts and account information for a specified user
export default function usePosts(username) {
  // State variables to store account and posts data
  const [account, setAccount] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  // Fetch data from Hive API when the username changes
  useEffect(() => {
    async function fetchData() {
      const accountData = await getUserAccount(username);
      const recentPostData = await fetchRecentPosts(username, 50);
      const allPostData = await fetchBlogPosts(username);

      recentPostData.forEach((post) => {
        post.imageUrl = getFirstImageUrl(post.body);
      });

      allPostData.forEach((post) => {
        post.imageUrl = getFirstImageUrl(post.body);
      });

      setAccount(accountData);
      setRecentPosts(recentPostData);
      setAllPosts(allPostData);
    }

    fetchData();
  }, [username]);

  // Return the fetched data for use in the component
  return { account, recentPosts, allPosts };
}