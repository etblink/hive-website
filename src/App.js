import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { getUserAccount, fetchBlogPosts } from "./hive";
import BlogPostPage from "./BlogPostPage";
import AccountDetails from "./components/AccountDetails";
import BlogPost from "./components/BlogPost";
import getFirstImageUrl from "./utils/getFirstImageUrl";
import "./components/styles.css";

function App() {
  const [account, setAccount] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const username = "etblink";
      const accountData = await getUserAccount(username);
      const recentPostData = await fetchBlogPosts(username, 9);
      const allPostData = await fetchBlogPosts(username);

      // Add imageUrl to each post object
      recentPostData.forEach((post) => {
        post.imageUrl = getFirstImageUrl(post.body);
        console.log("recentPost content:", post.body);
        console.log("recentPost imageUrl:", post.imageUrl);
      });

      allPostData.forEach((post) => {
        post.imageUrl = getFirstImageUrl(post.body);
        console.log("allPost content:", post.body);
        console.log("allPost imageUrl:", post.imageUrl);
      });

      setAccount(accountData);
      setRecentPosts(recentPostData);
      setAllPosts(allPostData);
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1 className="app__title">Welcome to ETBlink's Blog</h1>
      <BrowserRouter>
        <nav className="app__nav">
          <Link to="/">Home</Link>
          <span> | </span>
          <Link to="/account">Account Details</Link>
        </nav>
        <div className="app__container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="posts-container app__posts-container">
                    <div className="post-items app__post-items">
                      {recentPosts.map((post, index) => (
                        <BlogPost
                          key={post.permlink}
                          post={post}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/account"
              element={<AccountDetails account={account} />}
            />
            <Route path="/post/:author/:permlink" element={<BlogPostPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
