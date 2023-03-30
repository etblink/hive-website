import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import processPostContent from "./utils/processPostContent";
import { getPostWithFirstImageUrl } from "./hive";

// Component to display a single blog post with its full content
function BlogPostPage() {
  // Get the author and permlink from the route params
  const { author, permlink } = useParams();
  const [post, setPost] = useState(null);
  const contentRef = useRef();

  // Fetch the post data with its first image URL using getPostWithFirstImageUrl function
  useEffect(() => {
    async function fetchData() {
      const postData = await getPostWithFirstImageUrl(author, permlink);
      setPost(postData);
    }

    fetchData();
  }, [author, permlink]);

  // Process and sanitize the post content using the processPostContent function
  const sanitizedPostContent = useMemo(() => {
    if (post) {
      return processPostContent(post.body);
    }
  }, [post]);

  useEffect(() => {
    if (sanitizedPostContent) {
      contentRef.current.innerHTML = "";
      contentRef.current.appendChild(sanitizedPostContent.body);
    }
  }, [sanitizedPostContent]);

  // Render the blog post page with the post title, author, and content
  return (
    <div className="blog-post-page">
      {post ? (
        <>
          <h1 className="blog-post-page__title">{post.title}</h1>
          <p className="blog-post-page__author">By <Link to={`/blogger-profile/${post.author}`}>{post.author}</Link></p>
          <div className="blog-post-page__content" ref={contentRef} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogPostPage;