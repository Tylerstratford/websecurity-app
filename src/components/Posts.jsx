import React from "react";
import Post from "./Post";

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <div className="container">
      <div className="posts-container">
        <p className="blog-post-title">Posts</p>
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Posts;
