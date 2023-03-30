import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import processPostContent from "./utils/processPostContent";
import { getPostWithFirstImageUrl } from "./hive";
import "./components/styles.css";

function BlogPostPage() {
  const { author, permlink } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const postData = await getPostWithFirstImageUrl(author, permlink);
      setPost(postData);
    }

    fetchData();
  }, [author, permlink]);

  const sanitizedPostContent = useMemo(() => {
    if (post) {
      return processPostContent(post.body);
    }
  }, [post]);

  return (
    <div className="blog-post-page">
      {post ? (
        <>
          <h1 className="blog-post-page__title">{post.title}</h1>
          <p className="blog-post-page__author">By {post.author}</p>
          <div
            className="blog-post-page__content"
            dangerouslySetInnerHTML={{ __html: sanitizedPostContent }}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogPostPage;
