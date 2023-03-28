import React, { useState, useEffect } from 'react';
import { getUserAccount, getUserPosts, fetchBlogPosts } from './hive';
import './styles.css';

function App() {
  const [account, setAccount] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const username = 'etblink'; // Replace this with your Hive username
      const accountData = await getUserAccount(username);
      const postData = await fetchBlogPosts(username);

      setAccount(accountData);
      setPosts(postData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to Evan Kotler's Hive Blockchain Frontend</h1>
      {account && (
        <div>
          <h2>Account Details</h2>
          <p>Username: {account.name}</p>
          <p>Reputation: {account.reputation}</p>
          <p>Balance: {account.balance}</p>
        </div>
      )}
      <div>
        <h2>Recent Posts</h2>
        {posts.map((post) => (
          <BlogPost key={post.permlink} post={post} />
        ))}
      </div>
    </div>
  );
}

function BlogPost({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <a href={`https://hive.blog/@${post.author}/${post.permlink}`} target="_blank" rel="noreferrer">
        Read more
      </a>
      {/* Add more details and styling as needed */}
    </div>
  );
}

export default App;
