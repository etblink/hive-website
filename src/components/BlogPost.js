import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import truncateTitle from "../utils/truncateTitle";

// Component to display a single blog post with a background image and a truncated title
function BlogPost({ post, index }) {
  // Set the background image style
  const backgroundImageStyle = {
    backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : "none",
  };

  const navigate = useNavigate();
  const blogPostRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    };

    const blogPostElement = blogPostRef.current;
    blogPostElement.addEventListener("keydown", handleKeyPress);

    return () => {
      blogPostElement.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Navigate to the post page when the blog post is clicked
  const handleClick = () => {
    navigate(`/post/${post.author}/${post.permlink}`);
  };

  // Render the blog post component with the background image, truncated title, and clickable author name
  return (
    <div
      className="blog-post"
      style={backgroundImageStyle}
      onClick={handleClick}
      role="link"
      tabIndex={index}
      ref={blogPostRef}
    >
      <h2 className="blog-post__title">{truncateTitle(post.title)}</h2>
      <p className="blog-post__author">By {post.author}</p>
    </div>
  );
}

export default BlogPost;
