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
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";

const SL_Form = ({ isLogin, toggleLogin }) => {
  const email = useInputValidation("", emailValidator);
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single", 2);
  const [gender, setGender] = useState("");
  const { mode } = useParams();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);

  React.useEffect(() => {
    try {
      const storedLocation = localStorage.getItem("userLocation");
      setLocation(storedLocation ? JSON.parse(storedLocation) : null);
    } catch (error) {
      console.error("Error retrieving location from local storage:", error);
      // Handle errors appropriately, e.g., display a fallback message
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.removeItem("userLocation");

    console.log(`http://localhost:8080/${mode}`);

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Create the user object
        const user = !isLogin ? {
          userName: username.value,
          latitude: location[1],
          longitude: location[0],
          email: email.value,
          password: password.value,
          gender: gender,
        } : {
          userName: username.value,
          password: password.value,
        }

        console.log(user);

        // Sending POST request
        fetch(`http://localhost:8080/api/auth/${mode}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("currUser", JSON.stringify(data.currUser));
            let user = localStorage.getItem("currUser");
            console.log(JSON.parse(user));
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
      (error) => {
        // Handle error when user denies location permission
        setOpen(true);
      }
    );
  };

  return (
    <>
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

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Location is mandatory. Please allow location access.
          </MuiAlert>
        </Snackbar>

        
          <TextField
            required
            fullWidth
            label="Username"
            margin="normal"
            variant="outlined"
            value={username.value}
            onChange={username.changeHandler}
          />
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

        {!isLogin && <TextField
          required
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          value={email.value}
          onChange={email.changeHandler}
        />}
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
          <>
            <label>
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
      </form>
    </>
  );
};

export default SL_Form;
