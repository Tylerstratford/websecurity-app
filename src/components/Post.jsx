import React from "react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import DOMPurify from "dompurify";

const Post = ({ post }) => {
  return (
    <div className="border-bottom">
      <div className="post-container">
        <div className="post-container-left">
          <h1
            className="blog-title"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(`"${post.title}"`),
            }}
          ></h1>
          <h2
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }}
          ></h2>
        </div>
        <div className="post-container-right">
          <img src={post.fileName} />
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
