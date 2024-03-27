import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
// import VisuallyHidden from "./styles/StyledComponents"
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { emailValidator, usernameValidator } from "../../utils/validator";
import { useParams } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const SL_Form = ({ isLogin, toggleLogin }) => {
  const email = useInputValidation("", emailValidator);
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single", 2);
  const { mode } = useParams();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`http://localhost:8080/${mode}`);

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Create the user object
        const user = {
          userName: username.value,
          latitude: latitude,
          longitude: longitude,
          email: email.value,
          password: password.value,
        };
        // Conditionally add the userName field
        if (mode === "signup") {
          user.userName = username.value;
        }

        console.log(user);

        // Sending POST request
        fetch(`http://localhost:8080/${mode}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
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
      <Typography variant="h5" letterSpacing={isLogin ? 2 : 1}>
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
                bgColor: "rgba(0,0,0,0.5)",
                ":hover": {
                  bgColor: "rgba(0,0,0,0.7)",
                },
              }}
              component="label"
            >
              <>
                {/* <VisuallyHidden>Upload Avatar</VisuallyHidden> */}
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

        {!isLogin && (
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

        <TextField
          required
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          value={email.value}
          onChange={email.changeHandler}
        />
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
