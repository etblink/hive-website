import React, { useState, useEffect } from 'react';
import { getUserAccount, getUserPosts } from './hive';
import './styles.css';

function App() {
  const [account, setAccount] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const username = 'etblink'; // Replace this with your Hive username
      const accountData = await getUserAccount(username);
      const postData = await getUserPosts(username);

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
        <ul>
          {posts.map((post) => (
            <li key={post.permlink}>
              <a href={`https://hive.blog/@${post.author}/${post.permlink}`} target="_blank" rel="noreferrer">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
