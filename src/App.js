import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { getUserAccount, getUserPosts, fetchBlogPosts } from './hive';
import BlogPostPage from './BlogPostPage';
import './styles.css';

function App() {
  const [account, setAccount] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const username = 'etblink';
      const accountData = await getUserAccount(username);
      const postData = await fetchBlogPosts(username);
  
      // Filter posts authored by 'etblink'
      const etblinkPosts = postData.filter(post => post.author === username);
  
      setAccount(accountData);
      setPosts(etblinkPosts);
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
                <div class="recent-posts">
                  <h2>Recent Posts</h2>
                  {posts.map((post) => (
                    <BlogPost key={post.permlink} post={post} />
                  ))}
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

function BlogPost({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <Link to={`/post/${post.author}/${post.permlink}`}>
        Read more
      </Link>
    </div>
  );
}

export default App;
