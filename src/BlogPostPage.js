import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import processPostContent from "./utils/processPostContent";
import { getPostWithFirstImageUrl } from "./hive";

function BlogPostPage() {
  const { author, permlink } = useParams();
  const [post, setPost] = useState(null);
  const contentRef = useRef();

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

  useEffect(() => {
    if (sanitizedPostContent) {
      contentRef.current.innerHTML = "";
      contentRef.current.appendChild(sanitizedPostContent.body);
    }
  }, [sanitizedPostContent]);

  return (
    <div className="blog-post-page">
      {post ? (
        <>
          <h1 className="blog-post-page__title">{post.title}</h1>
          <p className="blog-post-page__author">By {post.author}</p>
          <div className="blog-post-page__content" ref={contentRef} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogPostPage;
