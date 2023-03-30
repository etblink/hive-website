import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import BlogPostPage from "./BlogPostPage";
import AccountDetails from "./components/AccountDetails";
import BlogPost from "./components/BlogPost";
import usePosts from "./hooks/usePosts";
import "./components/styles.css";

function App() {
  const { account, recentPosts, allPosts } = usePosts("etblink");

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
