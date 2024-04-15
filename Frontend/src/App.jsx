import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebcamCapture from './Components/Media/WebcamCapture ';
import ErrorPage from './utils/ErrorPage';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Upload_issue from "./pages/Upload_issue"
import LoactionSelector from "./pages/LoactionSelector";
import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import Sidebar from "./Components/SideBar/Sidebar";
import QueryForm from "./Components/Form/QueryForm";
import LandPage from "./Components/Landing page/LandPage";

function App() {

  return (
    <Router>
      <>
        {console.log("App")}
        <Routes>
          <Route path="/" element={<><LandPage/><Home /></>} />
          
          <Route path="/CaptureImg" element={<WebcamCapture />} />
          <Route path="/auth/:mode" element={<Login />} />
          <Route path="/query" element={<Upload_issue />} />
          <Route path="/:location" element={<LoactionSelector />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
