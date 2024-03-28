import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebcamCapture from './Components/Media/WebcamCapture ';
import ErrorPage from './utils/ErrorPage';
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import Upload_issue from "./pages/Upload_issue";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CaptureImg" element={<WebcamCapture />} />
        <Route path="/upload_issue" element={<Upload_issue />} />
        <Route path="/auth/:mode" element={<Login />} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
