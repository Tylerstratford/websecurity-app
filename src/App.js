import "./css/style.css";
import Form from "./components/Form";
import Posts from "./components/Posts";
import {useState} from 'react'

function App() {
  const [messages, setMessages] = useState([]);
  const addMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  return (
    <>
      <div className="container">
        <Form  addMessage={addMessage}/>
      </div>
      <div>
        <Posts  posts={messages}/>
      </div>
    </>
  );
}

export default App;
