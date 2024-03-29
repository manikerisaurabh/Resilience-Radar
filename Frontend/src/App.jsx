import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebcamCapture from './Components/Media/WebcamCapture ';
import ErrorPage from './utils/ErrorPage';
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

function App() {
  let [active, setActive] = useState(false);

  function setSidebar() {
    setActive(!active);
  }

  return (
    <Router>
      <>
        {console.log("App")}
        <Navbar dabba_ve={setSidebar} />
        <Sidebar visible={active} setSidebar={setSidebar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CaptureImg" element={<WebcamCapture />} />
          <Route path="/:mode" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
