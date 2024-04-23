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
import Footer from "./Components/Footer/Footer";
import Cards2 from "./Components/Cards/Cards2";
import th from "/th.jpeg";
import "./App.css";
import PendingReports from "./Components/Reportss/PendingReports";

function App() {
  let [active, setActive] = useState(false);
  let [logged, setLogged] = useState(false);
  let [switchh, setSwitch] = useState(false);
  let [displayQueryType, setDisplayQueryType] = useState({
    totalQueries: true,
    pendingQueries: false,
    departmentQueries: false,
    assignedQueries: false,
    toApproveQueries: false,
    completedQuerirs: false,
  });
  let [user, setUser] = useState(false);

  useEffect(() => {
    try {
      const currUser = localStorage.getItem("currUser");
      const user = currUser;
      console.log("this is curr Usrt : " + user)
      if (user) {
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

  console.log(displayQueryType, user, user.isGovEmp);
  const id = user.id;
  console.log(id);
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
                  setDisplayQueryType={setDisplayQueryType}
                />
                <Sidebar isEmp={false} visible={active} setSidebar={setSidebar} setDisplayQueryType={setDisplayQueryType} />
                <Outlet />
                <Footer />
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
                  {logged ? (
                    <div className="mt-[80px] mb-[100px]">
                      {displayQueryType.totalQueries && <Cards2 ul={user ? (!user.isGovEmp ? `http://localhost:8080/api/query/${user._id}/total` : "http://localhost:8080/api/query") : "http://localhost:8080/api/query"} />}
                      {displayQueryType.pendingQueries && <Cards2 ul={user ? (!user.isGovEmp ? `http://localhost:8080/api/query/pending/${user._id}` : `http://localhost:8080/api/gov/query/${user._id}/pending`) : "http://localhost:8080/api/query"} />}
                      {displayQueryType.departmentQueries && <Cards2 ul={user ? (`http://localhost:8080/api/gov/query/${user.department}`) : "http://localhost:8080/api/query"} />}
                      {displayQueryType.assignedQueries && <Cards2 ul={user ? (`http://localhost:8080/api/gov/query/${user._id}/inCharge`) : "http://localhost:8080/api/query"} canCommit={true} />}
                      {displayQueryType.toApproveQueries && <Cards2 ul={user ? (`http://localhost:8080/api/query/${user._id}/approvation`) : "http://localhost:8080/api/query"} />}
                      {displayQueryType.completedQuerirs && <Cards2 ul={user ? (`http://localhost:8080/api/query/${user._id}/completed`) : "http://localhost:8080/api/query"} />}
                    </div>
                  ) : (
                    <LandPage />
                  )}
                </div>
              }
            />
          </Route>
          <Route path="/CaptureImg" element={<WebcamCapture />} />
          <Route
            path="/auth/:mode"
            element={<Login setSwitch={setSwitch} setLogged={setLogged} />}
          />
          <Route path="/query/" element={<Upload_issue />} />
          <Route path="/query/edit/:key" element={<Upload_issue />} />
          <Route path="/DetailedData/:key/:md" element={<DetailedCard />} />
          <Route path="/pending" element={<PendingReports />} />
          <Route path="/util/:location" element={<LoactionSelector />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
