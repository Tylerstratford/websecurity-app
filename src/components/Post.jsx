import React from "react";

const Post = ({ post }) => {
  return (
    <div className="post-container">
      <h1 className="blog-title">{post.title}</h1>
      <h2 className="blog-body">{post.body}</h2>
    </div>
  );
};

export default Post;
