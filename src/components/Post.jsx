import React from "react";
import { Icon } from "@iconify/react";
const Post = ({ post }) => {
  return (
    <div className="test">
      <div className="post-container">
        <div className="post-container-left">
          <h1 className="blog-title">"{post.title}"</h1>
          <h2 className="blog-body">{post.body}</h2>
        </div>
        <div className="post-container-right">
          <h5>this is an image</h5>
        </div>
      </div>

      <div className="socials">
        <div className="social-icons">
          <Icon icon="el:comment" />
          <p>Comment</p>
        </div>
        <div className="social-icons">
        <Icon icon="icon-park-solid:like" />
          <p>Like</p>
        </div>
        <div className="social-icons">
        <Icon className="social-icon-icons" icon="flat-color-icons:share" />
          <p>Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
