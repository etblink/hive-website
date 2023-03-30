import React from "react";
import { useNavigate } from "react-router-dom";
import truncateTitle from "../utils/truncateTitle";

// Component to display a single blog post with a background image and a truncated title
function BlogPost({ post, index }) {
  // Set the background image style
  const backgroundImageStyle = {
    backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : "none",
  };

  const navigate = useNavigate();

   // Navigate to the post page when the blog post is clicked
  const handleClick = () => {
    navigate(`/post/${post.author}/${post.permlink}`);
  };

  // Render the blog post component with the background image and truncated title
  return (
    <div
      className="blog-post"
      style={backgroundImageStyle}
      onClick={handleClick}
      role="link"
      tabIndex={index}
      onKeyPress={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleClick();
        }
      }}
    >
      <h2 className="blog-post__title">{truncateTitle(post.title)}</h2>
    </div>
  );
}

export default BlogPost;