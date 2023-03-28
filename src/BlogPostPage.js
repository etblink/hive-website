import React, { useState, useEffect } from 'react';
import { getPost } from './hive';
import { useParams } from 'react-router-dom';

function BlogPostPage({ match }) {
    const { author, permlink } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const postData = await getPost(author, permlink);
      setPost(postData);
    }

    fetchData();
  }, [author, permlink]);

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>By {post.author}</p>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogPostPage;
