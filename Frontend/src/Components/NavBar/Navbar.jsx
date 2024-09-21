import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "80%", // Set your desired width percentage
    maxHeight: "80vh", // Set your desired height percentage of viewport height
  },
}));

const Navbar = ({ logged, setLogged, dabba_ve, setDisplayQueryType }) => {
  // let [clicked, setClicked] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  let [userid, setUserId] = useState("");
  let [showDialog, setShowDialog] = useState(false);
  let [approveRequestCount, setCount] = useState(0);
  let [pendingQuery, setPendingQuery] = useState("");
  let [resolvedQuery, setResolvedQuery] = useState("");
  let [totalQuery, setTotalQuery] = useState("");
  let [isEmp, setIsEmp] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
  );
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [address, setAddress] = React.useState({});

  useEffect(() => {
    console.log(isEmp);
  }, [isEmp])

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    // let url = isEmp ? "http://localhost:8080/api/gov/auth/logout" : "http://localhost:8080/api/auth/logout"

    // fetch()
    localStorage.removeItem("currUser");
    setLogged(false);
    handleClose();
  };

  const toggleProfile = () => {
    let url = !(isEmp == "true") ?  `http://localhost:8080/api/auth/${userid}/profile` : `http://localhost:8080/api/gov/auth/${userid}/profile`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data?.error) {
          console.log("error :", data?.error);
        }
        setUser(data);
        setAddress(data.address);
        console.log(isEmp == "true");
        if(!isEmp == "true") {
          setPendingQuery(data.pendingToApprove.length);
        setResolvedQuery(data.resolvedQueries.length);
        setTotalQuery(data.totalQuery.length);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setShowProfile((prevState) => !prevState);
    console.log(isEmp);
    console.log(!(isEmp == "true"));
    setShowDialog((prev) => !prev);
    setOpen(true);
  };

  useEffect(() => {
    if (logged) {
      let currUser = localStorage.getItem("currUser");
      let user = JSON.parse(currUser);
      console.log(user);
      setUserId(user._id);
      setIsEmp(user.isGovEmp);
    }
  }, [logged]);

  useEffect(() => {
    console.log(isEmp);
  }, [isEmp == "true"]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/query/${userid}/approvationCount`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCount(data.count);
        setAvatar(data.avatar);
      });
  }, [userid]);

  console.log("Navbar");
  // console.log(user);
  return (
    // <!-- Navbar -->
    <nav className="fixed top-0 left-0 w-[100vw] z-20 bg-gray-800 border-b-[1px] border-b-black border-opacity-30 shadow-black">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* <!-- Mobile menu button--> */}
          <div className="inset-y-0 left-0 flex items-center">
            <Tooltip title={"Menu"} placement="bottom" arrow>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                // onClick={() => {setClicked(!clicked)}}
                onClick={() => {
                  dabba_ve();
                }}
              >
                <span className="sr-only">Open main menu</span>
                {/* <!-- Icon for the menu bar on mobile --> */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                {/* <!-- Icon for the close button on mobile --> */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Tooltip>
          </div>
          {/* <!-- Logo --> */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center text-white p-2">
              {/* <img className="block lg:hidden h-8 w-auto text-blue-600" src="/your-logo.png" alt="Your Logo" /> */}
              <h2>
                <a
                  href=""
                  className="first-letter:text-white no-underline text-yellow-600 "
                >
                  Resilience Radar
                </a>
              </h2>
              {/* <img className="hidden lg:block h-8 w-auto text-blue-600" src="/your-logo.png" alt="Your Logo" /> */}
            </div>
          </div>

          {/* <!-- Sign in and Login links --> */}
          {!logged && (
            <div className="hidden sm:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link
                to="/auth/signup"
                className="no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/auth/login"
                className="no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            </div>
          )}

          {/* <!-- Account Info and Notification --> */}
          {logged && (
            <div className="flex flex-row justify-center items-center gap-3">
              <Tooltip
                title="Approve requests"
                placement="bottom"
                arrow
                PopperProps={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -22], // move the tooltip 10px up
                      },
                    },
                  ],
                }}
              >
                <Link className="text-decoration-none text-white">
                  <div
                    className="py-4 text-xl text-decoration-none"
                    onClick={() => {
                      setDisplayQueryType((prev) => {
                        return {
                          totalQueries: false,
                          pendingQueries: false,
                          departmentQueries: false,
                          assignedQueries: false,
                          completedQuerirs: false,
                          toApproveQueries: true,
                        };
                      });
                    }}
                  >
                    <Badge
                      badgeContent={approveRequestCount}
                      color="secondary"
                      max={4}
                      overlap="circular"
                    >
                      <CircleNotificationsIcon
                        color={"warning"}
                        fontSize="large"
                      />
                    </Badge>
                  </div>
                </Link>
              </Tooltip>
              <Tooltip title={"Account Info"} placement="bottom" arrow>
                <Avatar
                  alt={user?.userName}
                  src={user.profilepic}
                  onClick={toggleProfile}
                />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      {showDialog && (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#f5f5f5", // Soft background color for the modal
              borderRadius: "10px", // Rounded corners for a modern look
            },
          }}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
          >
            <Avatar
              alt={user?.userName}
              src={user.profilepic}
              sx={{ width: "105px", height: "105px", marginRight: "10px" }} // Increased avatar size with custom dimensions
            />
            {!(isEmp == "true") && <>{user.userName}'s Profile</>}
                {(isEmp == "true") && <>{user.name}'s Profile</>}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "#fff",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ padding: "20px" }}>
            {/* Display user information with motion effects */}
            <motion.div
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography gutterBottom sx={{ fontWeight: "bold" }}>
                {!(isEmp == "true") && <>Username: {user.userName}</>}
                {(isEmp == "true") && <>Username: {user.name}</>}
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Typography gutterBottom>Email: {user.email}</Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typography gutterBottom>Gender: {user.gender}</Typography>
            </motion.div>
            {!(isEmp == "true") && (
              <>
              <motion.div
                initial={{ opacity: 0, x: 150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Typography gutterBottom>
                  Address: {address?.county}, {address?.district},{" "}
                  {address?.state}, {address?.country}
                </Typography>
              </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Typography gutterBottom>
                    Total Queries: {totalQuery}
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Typography gutterBottom>
                    Pending Queries: {pendingQuery}
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Typography gutterBottom>
                    Resolved Queries: {resolvedQuery}
                  </Typography>
                </motion.div>
              </>
            )}
            {/* Add more user information as needed */}
          </DialogContent>
          <DialogActions sx={{ justifyContent: "flex-start", padding: "20px" }}>
            <Button
              autoFocus
              onClick={logout}
              sx={{
                backgroundColor: "#d32f2f",
                color: "#fff",
                "&:hover": { backgroundColor: "#9a0007" },
              }}
            >
              Log out
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </nav>
  );
};

export default Navbar;
