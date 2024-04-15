import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import WebcamCapture from "./Components/Media/WebcamCapture ";
import ErrorPage from "./utils/ErrorPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DetailedCard from "./pages/DetailedCard" 
import Upload_issue from "./pages/Upload_issue";
import LoactionSelector from "./pages/LoactionSelector";
import LandPage from "./Components/Landing page/LandPage";
import Navbar from "./Components/NavBar/Navbar";
import Sidebar from "./Components/SideBar/Sidebar";
import Reports from "./Components/Reportss/Reports"
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
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar dabba_ve={setSidebar} />
                <Sidebar visible={active} setSidebar={setSidebar} />
                <Outlet />
              </>
            }
          >
            <Route
              path="/"
              element={
                <>
                  <LandPage />
                  <Home />
                </>
              }
            />
          </Route>
          <Route path="/CaptureImg" element={<WebcamCapture />} />
          <Route path="/auth/:mode" element={<Login />} />
          <Route path="/query" element={<Upload_issue />} />
          <Route path="/DetailedCard" element={<DetailedCard/>} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/util/:location" element={<LoactionSelector />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
