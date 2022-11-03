import React from 'react'

const Post = ({ post }) => {
    
  return (
      <div>Post
          <h1>{post.title}</h1>
          <h2>{post.body}</h2>
    </div>
  )
}

export default Post