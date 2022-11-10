import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createBlogPost } from "../functions/createBlog";

const MessageForm = ({ addMessage }) => {
  const { user } = useAuth0();
  const [error, setError] = useState("");
  const [showElement, setShowElement] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 5000);
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
    userName: "",
  });

  const handleChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) {
      setError("Enter all fields");
      return;
    }
    setError("");

    const message = {
      id: user.sub,
      title: formData.title,
      body: formData.body,
      userName: user.name,
      fileName: formData.image || "",
    };

    const newblog = await createBlogPost(message);
    if (newblog === 201) {
      window.alert("Blog posted!");
      formData.title = "";
      formData.body = "";
      e.target.reset();
    } else window.alert("Something went wrong");
    // createBlogPost(message);
    // addMessage(message);
  };

  return (
    <div className="form-page-container">
      <div className="form-container">
        <div className="form-left">
          <h1>Create a post</h1>
        </div>
        <div className="form-right">
          <form onSubmit={handleSubmit}>
            <input
              className="title-input"
              placeholder="Title"
              onChange={handleChange}
              name="title"
            ></input>
            <div>
              <textarea
                placeholder="Write something..."
                onChange={handleChange}
                name="body"
              />
              <p className="error-message">{error}</p>
            </div>
            <input name="image" className="upload-image" type="file"></input>
            <button>Submit blog</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
