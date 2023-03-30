import React from "react";
import { useParams } from "react-router-dom";
import BlogPost from "./BlogPost";
import usePosts from "../hooks/usePosts";

// Component to display recent blog posts from a specified blogger
function BloggerPage() {
  // Get the username from the route params and fetch posts using usePosts hook
  const { username } = useParams();
  const { recentPosts } = usePosts(username);

  return (
    <div className="blogger-page">
      <h2 className="blogger-page__title">Posts by {username}</h2>
      <div className="posts-container blogger-page__posts-container">
        <div className="post-items blogger-page__post-items">
          {recentPosts.map((post, index) => (
            <BlogPost key={post.permlink} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BloggerPage;