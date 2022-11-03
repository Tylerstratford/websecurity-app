import "./css/style.css";
import Form from "./components/Form";
import Posts from "./components/Posts";
import { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./views/LandingPage";

function App() {
  const [messages, setMessages] = useState([]);
  const addMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  return (
    <>
      <Navbar className="container" />
      <div>
        <LandingPage />
        <Form addMessage={addMessage} />
        <Posts posts={messages} />
      </div>
    </>
  );
}

export default App;
