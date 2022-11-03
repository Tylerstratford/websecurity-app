import "./css/style.css";
import Form from "./components/Form";
import Posts from "./components/Posts";


function App() {
  return (
    <>
      <div className ="container">
        <Form />
      </div>
      <div>
        <Posts />
      </div>
    </>
  );
}

export default App;
