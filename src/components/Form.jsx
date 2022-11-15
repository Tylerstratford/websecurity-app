import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createBlogPost } from "../functions/createBlog";
import DOMPurify from "dompurify";
import defaultImage from "../images/defaultImage.png";
import axios from "axios";

const MessageForm = ({ addMessage }) => {
  const { user } = useAuth0();
  const [error, setError] = useState("");
  const [showElement, setShowElement] = useState(true);
  const [visible, setVisible] = useState(true)

  const defaultImg = defaultImage;
  const [imgSrc, setImageSrc] = useState(defaultImg);

  const setImage = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = (x) => {
      setImageSrc(x.target.result);
    };

    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.files[0],
    }));
  };

  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 5000);
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userName: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const removeImage = (e) => {
    setImageSrc(defaultImage);
    e.target.reset();
  };

  const removeElement = () => {
    setVisible((prev) => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) {
      setError("Enter all fields");
      return;
    }
    setError("");

    let message = new FormData();
    message.append("appId", user.sub);
    message.append("title", formData.title);
    message.append("body", formData.body);
    message.append("userName", user.name);

    if (formData.image === null) {
      message.append("image", formData.image);
      message.get("image", formData.image);
      message.delete("image", formData.image);
    } else {
      message.append("file", formData.image);
    }

    try {
      const newblog = await axios.post(
        "https://localhost:7290/api/Blog",
        message
      );

      if (newblog.status === 201) {
        window.alert("Blog posted!");
        console.log(newblog.status);
        formData.title = "";
        formData.body = "";
        setImageSrc(defaultImage);
        e.target.reset();
      }
    } catch (newblog) {
      if (newblog.status !== 201) {
        window.alert("Something went wrong :(");
      }
    }
  };

  return (
    <div className="form-page-container">
      <h1>Create a post</h1>

      <div className="form-container">
        <div className="form-left">
          <img className="img" src={imgSrc} />
        </div>
        <div className="form-right">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <input
              name="image"
              className="upload-image"
              type="file"
              accept=".jpg, .png"
              onChange={setImage}
            ></input>
            <h5>.jpg or .png</h5>

            <button>Submit blog</button>
          </form>
          {formData.image && (
            visible && (
              <button onClick={() => { removeImage(); removeElement(); }}>Remove image</button>

            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
