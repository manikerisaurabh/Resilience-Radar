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
import useCurrentUser from "./hooks/UseCurrentUser";
import { useSpring, animated } from "react-spring";
import { Typography } from "@mui/material";

function App() {
  const currentUser = useCurrentUser();
  let [active, setActive] = useState(false);
  let [logged, setLogged] = useState(false);
  let [switchh, setSwitch] = useState(false);
  let [userid, setUserId] = useState("");
  let [dept, setDept] = useState("");
  let [noQueries, setNoQueries] = useState(true);
  let [displayNoQ, setDisplayNoQ] = useState(false);
  let [user, setUser] = useState(false);
  const [isGovEmp, setIsGovEmp] = useState(false);
  let [displayQueryType, setDisplayQueryType] = useState({
    totalQueries: true,
    postedQueries: false,
    pendingQueries: false,
    departmentQueries: false,
    assignedQueries: false,
    toApproveQueries: false,
    completedQuerirs: false,
  });
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 2000,
  });

  useEffect(() => {
    try {
      const currUser = localStorage.getItem("currUser");
      let user = currUser;
      console.log("this is curr Usrt : " + user);
      if (user) {
        () => {
          setUser(user);
        };
        setLogged(true);
        console.log("Logged in");
        console.log("Logged in " + logged);
        console.log(JSON.parse(user));
        user = JSON.parse(user);
        console.log(user.isGovEmp);
        if (user.isGovEmp == "true") {
          setIsGovEmp(true);
        } else {
          setIsGovEmp(false);
        }
        console.log(user.isGovEmp);
        console.log(user.department);
        setDept(user.department);
        setUserId(user._id);
      }
    } catch (error) {
      console.log("Error while retrieving data from localStorage", error);
    }
  }, [switchh]);

  function setSidebar() {
    setActive(!active);
  }
  console.log(displayQueryType, user, user.isGovEmp, userid);
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
              <div className="min-h-[85vh]">
                <Navbar
                  logged={logged}
                  dabba_ve={setSidebar}
                  setLogged={setLogged}
                  user={
                    user
                      ? user
                      : {
                          userName: "X",
                          profilepic: th,
                        }
                  }
                  userid={userid}
                  setDisplayQueryType={setDisplayQueryType}
                />
                <Sidebar
                  isEm={user.isGovEmp}
                  visible={active}
                  setSidebar={setSidebar}
                  setDisplayQueryType={setDisplayQueryType}
                />
                <Outlet />
                <Footer noQueries={noQueries} logged={logged} />
              </div>
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
                      {displayQueryType.totalQueries && (
                        <Cards2
                          ul="http://localhost:8080/api/query"
                          setNoQueries={setNoQueries}
                          setDisplayNoQ={setDisplayNoQ}
                        />
                      )}
                      {displayQueryType.postedQueries && (
                        <Cards2
                          ul={`http://localhost:8080/api/query/${userid}/total`}
                          setNoQueries={setNoQueries}
                          setDisplayNoQ={setDisplayNoQ}
                        />
                      )}
                      {displayQueryType.pendingQueries && (
                        <Cards2
                          ul={
                            !isGovEmp
                              ? `http://localhost:8080/api/query/pending/${userid}`
                              : `http://localhost:8080/api/gov/query/${userid}/pending`
                          }
                          setNoQueries={setNoQueries}
                          setDisplayNoQ={setDisplayNoQ}
                        />
                      )}
                      {displayQueryType.departmentQueries && (
                        <Cards2
                          ul={`http://localhost:8080/api/gov/query/${dept}`}
                          setNoQueries={setNoQueries}
                          setDisplayNoQ={setDisplayNoQ}
                        />
                      )}
                      {displayQueryType.assignedQueries && (
                        <Cards2
                          ul={`http://localhost:8080/api/gov/query/${userid}/inCharge`}
                          canCommit={true}
                          tooApprove={false}
                          setNoQueries={setNoQueries}
                          setDisplayNoQ={setDisplayNoQ}
                        />
                      )}
                      {displayQueryType.toApproveQueries && (
                        <Cards2
                          ul={`http://localhost:8080/api/query/${userid}/approvation`}
                          canCommit={false}
                          tooApprove={true}
                          setNoQueries={setNoQueries}
                          setDisplayNoQ={setDisplayNoQ}
                        />
                      )}
                      {displayQueryType.completedQuerirs && (
                        <Cards2
                          ul={`http://localhost:8080/api/query/${userid}/completed`}
                          setNoQueries={setNoQueries}
                          setDisplayNoQ={setDisplayNoQ}
                        />
                      )}
                      {noQueries && displayNoQ && (
                        <animated.div style={fadeIn}>
                          <Typography
                            variant="h1"
                            align="left"
                            color="gray"
                            style={{ marginTop: "50px", marginLeft: "5vw" }}
                          >
                            NO Queries Found
                          </Typography>
                        </animated.div>
                      )}
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
            element={
              <Login
                setSwitch={setSwitch}
                setLogged={setLogged}
                setUserId={setUserId}
              />
            }
          />
          <Route path="/query/:key" element={<Upload_issue />} />
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
