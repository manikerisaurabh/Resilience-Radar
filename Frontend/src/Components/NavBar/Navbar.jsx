import React, { useState, useEffect } from "react";
import MobileMenuBar from "./MobileMenuBar";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import Profile from "../Profile/Profile";
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
import th from "/th.jpeg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: '80%', // Set your desired width percentage
    maxHeight: '80vh', // Set your desired height percentage of viewport height
  },
}));

const Navbar = ({ logged, dabba_ve, setDisplayQueryType }) => {
  // let [clicked, setClicked] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  let [userid, setUserId] = useState("");
  let [showDialog, setShowDialog] = useState(false);
  let [approveRequestCount, setCount] = useState(0);
  const [avatar, setAvatar] = useState("https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=");
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const toggleProfile = () => {
    setShowProfile((prevState) => !prevState);
    setShowDialog((prev) => !prev);
    setOpen(true);
  };

  useEffect(() => {
    let currUser = localStorage.getItem("currUser");
    let user = JSON.parse(currUser);
    console.log(user);
    setUserId(user._id);
  }, [])

  useEffect(() => {

    console.log(userid);
    fetch(`http://localhost:8080/api/query/${userid}/approvationCount`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data);
        setCount(data.count);
        setAvatar(data.avatar)
      })

    fetch(`http://localhost:8080/api/auth/${userid}/profile`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data.user);
        setUser(data.user);
      })


  }, [userid])

  console.log("Navbar");
  // console.log(user);
  return (
    // <!-- Navbar -->
    <nav className="fixed top-0 left-0 w-[100vw] z-20 bg-gray-800 border-b-[1px] border-b-black border-opacity-30 shadow-black">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* <!-- Mobile menu button--> */}
          <div className="inset-y-0 left-0 flex items-center">
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
          {logged && (
            <div className="flex flex-row justify-center items-center gap-3">
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
              <Avatar
                alt={user?.userName}
                src={avatar}
                onClick={toggleProfile}
              />
            </div>
          )}
        </div>
      </div>
      {/* {clicked && <MobileMenuBar />} */}
      {showDialog && (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            User Profile
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {/* Display user information */}
            <Typography gutterBottom>
              Username: {user.userName}
            </Typography>
            <Typography gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography gutterBottom>
              Gender: {user.gender}
            </Typography>
            {/* Add more user information as needed */}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </nav>
  );
};

export default Navbar;
