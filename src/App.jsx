import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/HomePage";
import Show from "./components/ShowPage";
import Form from "./components/Form";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addbill" element={<Form type={"Add"}/>} />
        <Route path="/error" element={<NotFound />} />
        <Route path="/bill/:id" element={<Show/>} />
        <Route path="/:id/edit" element={<Form type={"Update"}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
