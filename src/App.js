import "./css/style.css";
import Form from "./components/Form";
import Posts from "./components/Posts";
import { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./views/LandingPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./views/LoginPage";

function App() {
  const [messages, setMessages] = useState([]);
  const addMessage = (message) => {
    setMessages((state) => [...state, message]);
  };
  return (
    <>
      <Navbar className="container" />
      <div>
        <Routes>
          <Route
            path="/"
            element={[<LandingPage />, <Posts posts={messages} />]}
          />
          <Route
            path="/createBlogPost"
            element={<Form addMessage={addMessage} />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
