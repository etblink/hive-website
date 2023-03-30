import React from "react";
import { Link } from "react-router-dom";

function BlogPost({ post, index }) {
  const backgroundImageStyle = {
    backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : "none",
  };

  function truncateTitle(title, maxLength = 30) {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  }

  return (
    <div className="blog-post" style={backgroundImageStyle}>
      <Link to={`/post/${post.author}/${post.permlink}`}>
        <h2 className="blog-post__title">
          {truncateTitle(post.title)}
        </h2>
      </Link>
    </div>
  );
}

export default BlogPost;
