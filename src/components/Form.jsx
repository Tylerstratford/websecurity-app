import { useState } from "react";

const MessageForm = ({ addMessage }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    imgUrl: "",
  });

  const handleChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) {
      setError("Enter all fields");
      return;
    }
    setError("");

    const message = {
      id: Date.now().toString(),
      title: formData.title,
      body: formData.body,
    };

    console.log(message.id, message.title, message.body);
    addMessage(message);
  };

  return (
    <div>
      <header>My Blog</header>
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
            <p>{error}</p>
            <div>
              <textarea
                placeholder="Write something..."
                onChange={handleChange}
                name="body"
              />
              <p>{error}</p>
            </div>
            <input className="upload-image" type="file"></input>
            <button>Submit blog</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
