import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { getUserAccount, fetchRecent3Posts, fetchBlogPosts } from './hive';
import BlogPostPage from './BlogPostPage';
import './styles.css';

function App() {
  const [account, setAccount] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const username = 'etblink';
      const accountData = await getUserAccount(username);
      const recentPostData = await fetchRecent3Posts(username);
      const allPostData = await fetchBlogPosts(username);

      setAccount(accountData);
      setRecentPosts(recentPostData);
      setAllPosts(allPostData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to ETBlink's Blog</h1>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <span> | </span>
          <Link to="/account">Account Details</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="img-container">
                  <img
                    src="https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </div>
                <div className="app-container">
                  <Sidebar posts={allPosts} />
                  <div className="posts-container">
                    <h2 className="posts-title">
                      <big>Recent Posts</big>
                    </h2>
                    <div className="post-items">
                      {recentPosts.map((post) => (
                        <BlogPost key={post.permlink} post={post} />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            }
          />
          <Route path="/account" element={<AccountDetails account={account} />} />
          <Route path="/post/:author/:permlink" element={<BlogPostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Sidebar({ posts }) {
  return (
    <div className="sidebar">
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.permlink}>
            <Link to={`/post/${post.author}/${post.permlink}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AccountDetails({ account }) {
  if (!account) {
    return <p>Loading account details...</p>;
  }

  return (
    <div>
      <h2>Account Details</h2>
      <p>Username: {account.name}</p>
      <p>Reputation: {account.reputation}</p>
      <p>Balance: {account.balance}</p>
    </div>
  );
}

function truncateTitle(title, maxLength = 40) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
}

function BlogPost({ post }) {
  return (
    <div>
      <h2>{truncateTitle(post.title)}</h2>
      <p>{post.summary}</p>
      <Link to={`/post/${post.author}/${post.permlink}`}>
        Read more
      </Link>
    </div>
  );
}


export default App;

