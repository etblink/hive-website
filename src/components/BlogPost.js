import React from "react";
import { useNavigate } from "react-router-dom";
import truncateTitle from "../utils/truncateTitle";

function BlogPost({ post, index }) {
  const backgroundImageStyle = {
    backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : "none",
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.author}/${post.permlink}`);
  };

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
