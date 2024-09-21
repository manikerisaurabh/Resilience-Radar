import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { emailValidator, usernameValidator } from "../../utils/validator";
import { Link, useParams } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {InputLabel, Select, MenuItem} from "@mui/material";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import GovernmentSignUp from "./GovernmentSignUp";

const SL_Form = ({ isLogin, toggleLogin, setSwitch, setLogged, setUserId }) => {
  const email = useInputValidation("", emailValidator);
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single", 2);
  const [gender, setGender] = useState("");
  const { mode } = useParams();
  const [open, setOpen] = useState(false);
  const [choose, setChoice] = useState(false);
  const [isEmp, setIsEmp] = useState(false);
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: username.value,
    department: "",
    email: email.value,
    phoneNumber: "",
    password: password.value,
    confirmPassword: "",
    gender: gender,
    avatar: avatar.file,
    latitude: "",
    longitude: "",
  });
  const [snackbarQueue, setSnackbarQueue] = useState([]);

  console.log("isEmp :", isEmp);

  React.useEffect(() => {
    console.log(isLogin);
    try {
      const storedLocation = localStorage.getItem("userLocation");
      setLocation(storedLocation ? JSON.parse(storedLocation) : null);
      // Retrieve form data from local storage
      const storedFormData = localStorage.getItem("formFields");
      if (storedFormData) {
        setFormData(JSON.parse(storedFormData));
      }
    } catch (error) {
      console.error("Error retrieving location from local storage:", error);
      // Handle errors appropriately, e.g., display a fallback message
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addSnackbar = (message) => {
    setSnackbarQueue((oldQueue) => [...oldQueue, message]);
  };

  const removeSnackbar = () => {
    setSnackbarQueue((oldQueue) => oldQueue.slice(1));
  };

  const handleChange = (event) => {
    setFormData({ ...formData, department: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.disabled = true;

    // Check if password and confirm password are the same
    if (!isLogin && password.value !== formData.confirmPassword) {
      // Show Snackbar with error message
      setOpen(true);
      addSnackbar("Passwords do not match.");
      setTimeout(() => {
        setOpen(false);
      }, 50000);
      return;
    }

    localStorage.removeItem("userLocation");
    localStorage.removeItem("currUser");

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Create the user object
        const user = !isLogin
          ? {
              userName: username.value,
              latitude: location[0],
              longitude: location[1],
              email: email.value,
              password: password.value,
              gender: gender,
            }
          : {
              email: email.value,
              password: password.value,
              userName: username.value,
            };

        formData.email = email.value;
        formData.gender = gender;
        formData.password = password.value;
        formData.userName = username.value;
        if (!isLogin) {
          formData.latitude = location[0];
          formData.longitude = location[1];
        }
        console.log(user);
        console.log(formData);
        console.log(mode);
        console.log(isEmp);
        console.log(isEmp == "true");
        // Sending POST request
        let ul = isEmp
          ? `http://localhost:8080/api/gov/auth/${mode}`
          : `http://localhost:8080/api/auth/${mode}`;
        fetch(ul, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.error);
            if (data.error) {
              return addSnackbar(data.error);
            }
            localStorage.setItem("currUser", JSON.stringify(data));
            window.history.back();
            //console.log(JSON.parse(user));
            setSwitch((prev) => !prev);
            setLogged(true);
            setUserId(data._id);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
      (error) => {
        // Handle error when user denies location permission
        setOpen(true);
        console.log(error);
        // Add a snackbar
        addSnackbar("Location is mandatory. Please allow location access.");
      }
    );
  };

  console.log("Choice", choose);
  return (
    <>
      {choose ? (
        <div className="">
          <Typography
            variant="h5"
            letterSpacing={isLogin ? 2 : 1}
            className="text-center "
          >
            {isLogin ? "Login" : "Sign in"}
          </Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={avatar.preview}
                />
                {/* {avatar.file} */}
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "black",
                    bgColor: "rgba(0,0,0,0.8)",
                    ":hover": {
                      bgColor: "rgba(0,0,0,0.5)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <input
                      type="file"
                      style={{
                        border: "0",
                        clip: "rect(0 0 0 0)",
                        height: "1",
                        margin: "-1",
                        overflow: "hidden",
                        padding: "0",
                        position: "absolute",
                        whiteSpace: "nowrap",
                        width: "1",
                      }}
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>
            )}
            {avatar.error && (
              <Typography
                m={"1rem auto"}
                width={"fit-content"}
                display={"block"}
                color={"error"}
                variant="caption"
              >
                {avatar.error}
              </Typography>
            )}
            {isEmp && !isLogin && (
              <div className="flex flex-col gap-4 mb-2 mt-4">
                <TextField
                  required
                  fullWidth
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <InputLabel>Department</InputLabel>
                <Select
                  variant="standard"
                  name="category"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Environment">Environment</MenuItem>
                  <MenuItem value="Social Welfare">Social Welfare</MenuItem>
                </Select>

                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            )}
            {!isEmp && (
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
            )}
            {username.error && (
              <Typography color={"error"} variant="caption">
                {username.error}
              </Typography>
            )}
            {/* <div className="flex items-center">
            <HiOutlineMail className="text-gray-500 mr-2" />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              name="email"
              value={email.value}
              onChange={email.changeHandler}
            />
          </div>
          <div className="flex items-center">
            <HiOutlineLockClosed className="text-gray-500 mr-2" />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              size="small"
              name="password"
              value={password.value}
              onChange={password.changeHandler}
            />
          </div> */}
            {(!isLogin || isEmp) && (
              <TextField
                required
                fullWidth
                label="Email"
                margin="normal"
                variant="outlined"
                value={email.value}
                onChange={email.changeHandler}
              />
            )}
            {email.error && (
              <Typography color={"error"} variant="caption">
                {email.error}
              </Typography>
            )}
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={password.value}
              onChange={password.changeHandler}
            />
            {password.error && (
              <Typography color={"error"} variant="caption">
                {password.error}
              </Typography>
            )}
            {!isLogin && (
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="my-3"
              />
            )}
            {!isLogin && (
              <>
                <label className="block">
                  {" "}
                  {location ? (
                    <Stack direction="row" spacing={1}>
                      <Typography variant="caption" color="text.secondary">
                        Latitude:
                      </Typography>
                      <Typography variant="body2">{location[0]}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Longitude:
                      </Typography>
                      <Typography variant="body2">{location[1]}</Typography>
                    </Stack>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      Choose Your Location
                    </Typography>
                  )}
                </label>

                <div className="border hover:border-blue-500 rounded w-fit">
                  <Link
                    to="/util/Location"
                    className="btn btn-close-white border-0"
                  >
                    {location ? "Update Current Location" : "Add Location"}
                  </Link>
                </div>
              </>
            )}
            {!isLogin && (
              <div>
                <FormControlLabel
                  control={
                    <Radio
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                    />
                  }
                  label="Female"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={gender === "other"}
                      onChange={() => setGender("other")}
                    />
                  }
                  label="Other"
                />
              </div>
            )}
            <Button
              sx={{
                marginTop: "1rem",
                marginBottom: "0.5rem",
              }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              {isLogin ? "Log in" : "sign in"}
            </Button>
            <Typography textAlign={"center"}>OR</Typography>
            <Button
              sx={{
                marginTop: "0.5rem",
              }}
              fullWidth
              variant="outlined"
              onClick={toggleLogin}
            >
              {!isLogin ? "Log in instead" : "sign up instead"}
            </Button>
            {/* // In your render method */}
            {snackbarQueue.length > 0 && (
              <Snackbar open autoHideDuration={6000} onClose={removeSnackbar}>
                <MuiAlert
                  onClose={removeSnackbar}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {snackbarQueue[0]}
                </MuiAlert>
              </Snackbar>
            )}
          </form>
        </div>
      ) : (
        <>
          <Button
            sx={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              setChoice((currCHoice) => !currCHoice);
              setIsEmp(false);
            }}
          >
            Public
          </Button>

          <Typography textAlign={"center"}>OR</Typography>

          <Button
            sx={{
              marginTop: "0.5rem",
            }}
            fullWidth
            variant="contained"
            color="success"
            onClick={() => {
              setChoice((currCHoice) => !currCHoice);
              setIsEmp(true);
            }}
          >
            Government Authority
          </Button>
        </>
      )}
    </>
  );
};

export default SL_Form;
