import React, { useEffect, useState } from "react";
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
import DetailedCard from "./pages/DetailedCard";
import Upload_issue from "./pages/Upload_issue";
import LoactionSelector from "./pages/LoactionSelector";
import LandPage from "./Components/Landing page/LandPage";
import Navbar from "./Components/NavBar/Navbar";
import Sidebar from "./Components/SideBar/Sidebar";
import Reports from "./Components/Reportss/Reports";
import th from "/th.jpeg"
import "./App.css";

function App() {
  let [active, setActive] = useState(false);
  let [logged, setLogged] = useState(false);
  let [switchh, setSwitch] = useState(false);
  let [user, setUser] = useState(false);

  useEffect(() => {
    try {
      const currUser = localStorage.getItem("currUser");
      const user = JSON.parse(currUser);
      if(user) {
        setUser(user);
        setLogged(true);
        console.log("Logged in");
        console.log(user);
      }
    } catch (error) {
      console.log("Error while retrieving data from localStorage", error);
    }
  }, [switchh]);

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
                <Navbar
                  logged={logged}
                  dabba_ve={setSidebar}
                  user={
                    user
                      ? user
                      : {
                          userName: "X",
                          profilepic: th,
                        }
                  }
                />
                <Sidebar visible={active} setSidebar={setSidebar} />
                <Outlet />
              </>
            }
          >
            <Route
              path="/"
              element={
                <div
                  className=""
                  onClick={() => {
                    if (active) {
                      setActive((visible) => !visible);
                    }
                  }}
                >
                  {logged ? <Home /> : <LandPage />}
                </div>
              }
            />
          </Route>
          <Route path="/CaptureImg" element={<WebcamCapture />} />
          <Route
            path="/auth/:mode"
            element={<Login setSwitch={setSwitch} setLogged={setLogged} />}
          />
          <Route path="/query" element={<Upload_issue />} />
          <Route path="/query/edit/:key" element={<Upload_issue />} />
          <Route path="/DetailedData/:key" element={<DetailedCard />} />
          <Route path="/pending" element={<Reports />} />
          <Route path="/util/:location" element={<LoactionSelector />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
