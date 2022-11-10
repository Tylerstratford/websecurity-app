import React, { useEffect, useState } from "react";

import Post from "./Post";

const Posts = ({ posts }) => {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("https://localhost:7290/api/Blog");
      setPosts(await res.json());
    }

    fetchBlogs();
  }, []);
  return (
    <div className="container">
      <div className="posts-container">
        <p className="blog-post-title">Posts</p>
        {/* {post && post.map((post) => <Post key={post.id} post={post} />)} */}
        {post &&
          post
            .sort(function (a, b) {
              return parseInt(b.id) - parseInt(a.id);
            })
            .map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Posts;
