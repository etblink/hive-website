import { useState, useEffect } from "react";
import { getUserAccount, fetchBlogPosts, fetchRecentPosts } from "../hive";
import getFirstImageUrl from "../utils/getFirstImageUrl";

export default function usePosts(username) {
  const [account, setAccount] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const accountData = await getUserAccount(username);
      const recentPostData = await fetchRecentPosts(username, 11);
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

  return { account, recentPosts, allPosts };
}
