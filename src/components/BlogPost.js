import React from "react";
import { Link } from "react-router-dom";
import truncateTitle from "../utils/truncateTitle";

function BlogPost({ post, index }) {
  const backgroundImageStyle = {
    backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : "none",
  };

  return (
    <div className="blog-post" style={backgroundImageStyle}>
      <Link to={`/post/${post.author}/${post.permlink}`}>
        <h2 className="blog-post__title">{truncateTitle(post.title)}</h2>
      </Link>
    </div>
  );
}

export default BlogPost;
