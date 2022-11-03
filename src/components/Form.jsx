import React from "react";

function Form() {
  return (
    <>
      <header>My Blog</header>
      <form className="form-container">
        <div className="form-left">
          <h1>Create a post</h1>
        </div>
        <div className="form-right">
          <form>
            <input className="title-input" placeholder="Title"></input>
            <div>
              <textarea placeholder="Write something..." />
            </div>
            <input className="upload-image" type="file"></input>
            <button>Submit blog</button>
          </form>
        </div>
      </form>
    </>
  );
}

export default Form;
