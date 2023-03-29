import React, { useMemo } from "react";
import { Link } from "react-router-dom";

function BlogPost({ post, index }) {
  const maxLength = index === 0 ? 40 : 20;
  const backgroundImageStyle = post.imageUrl
    ? { backgroundImage: `url(${post.imageUrl})` }
    : {};

  const truncatedTitle = useMemo(() => {
    return truncateTitle(post.title, maxLength);
  }, [post.title, maxLength]);

  return (
    <div className="blog-post" style={backgroundImageStyle}>
      <h2 className="blog-post__title">{truncatedTitle}</h2>
      <p className="blog-post__summary">{post.summary}</p>
      <Link
        to={`/post/${post.author}/${post.permlink}`}
        className="blog-post__link"
      >
        Read more
      </Link>
    </div>
  );
}

function truncateTitle(title, maxLength = 20) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
}

export default BlogPost;
