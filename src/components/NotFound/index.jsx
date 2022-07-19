import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function App() {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      <button
        onClick={() => {
          navigate("/");
        }}
        class="custom-btn btn-15"
      >
        Go Back
      </button>
      <h1>Whoops!</h1>
      <p>Something went wrong</p>
    </div>
  );
}

export default App;
