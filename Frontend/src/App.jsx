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
  let [userid, setUserId] = useState("");
  let [displayQueryType, setDisplayQueryType] = useState({
    totalQueries: true,
    postedQueries: false,
    pendingQueries: false,
    departmentQueries: false,
    assignedQueries: false,
    toApproveQueries: false,
    completedQuerirs: false,
  });
  let [user, setUser] = useState(false);
  const [isGovEmp, setIsGovEmp] = useState(false);
  useEffect(() => {
    try {
      const currUser = localStorage.getItem("currUser");
      let user = currUser;
      console.log("this is curr Usrt : " + user)
      if (user) {

        () => {
          setUser(user);
        }
        setLogged(true);
        console.log("Logged in");
        console.log(JSON.parse(user));
        user = JSON.parse(user);
        if (user.isGovEmp == true) {
          setIsGovEmp(true);
        } else {
          setIsGovEmp(false);
        }

        console.log(user._id);
        setUserId(user._id)
      }
    } catch (error) {
      console.log("Error while retrieving data from localStorage", error);
    }
  }, [switchh]);

  function setSidebar() {
    setActive(!active);
  }
  console.log(`http://localhost:8080/api/query/${userid}/total`);

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
                <Sidebar isEmp={isGovEmp} visible={active} setSidebar={setSidebar} setDisplayQueryType={setDisplayQueryType} />
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
                      {displayQueryType.totalQueries && <Cards2 ul="http://localhost:8080/api/query" />}
                      {displayQueryType.postedQueries && <Cards2 ul={`http://localhost:8080/api/query/${userid}/total`} />}
                      {displayQueryType.pendingQueries && <Cards2 ul={(isGovEmp ? `http://localhost:8080/api/query/pending/${userid}` : `http://localhost:8080/api/gov/query/${userid}/pending`)} />}
                      {displayQueryType.departmentQueries && <Cards2 ul={(`http://localhost:8080/api/gov/query/${user.department}`)} />}
                      {displayQueryType.assignedQueries && <Cards2 ul={(`http://localhost:8080/api/gov/query/${userid}/inCharge`)} canCommit={true} tooApprove={false}/>}
                      {displayQueryType.toApproveQueries && <Cards2 ul={(`http://localhost:8080/api/query/${userid}/approvation`)} canCommit={false} tooApprove={true}/>}
                      {displayQueryType.completedQuerirs && <Cards2 ul={(`http://localhost:8080/api/query/${userid}/completed`)} />}
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
            element={<Login setSwitch={setSwitch} setLogged={setLogged} setUserId={setUserId} />}
          />
          <Route path="/query" element={<Upload_issue />} />
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
