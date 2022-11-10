export async function createBlogPost(blogPost) {
  const newBlogPost = {
    appId: blogPost.id,
    title: blogPost.title,
    body: blogPost.body,
    userName: blogPost.userName,
    fileName: blogPost.fileName,
  };
  try {
    const response = await fetch("https://localhost:7290/api/Blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlogPost),
    });
      
    const result = response.status;

    console.log(result);
    return result;
  } catch (error) {}
}
