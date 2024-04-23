import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
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
  Snackbar,
  Alert
} from "@mui/material";

const WebcamCapture = ({ srcc = "", se }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(srcc);
  const [imageUrl, setImageUrl] = useState(""); // State for the uploaded image URL
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append("file", imgSrc);
    data.append("upload_preset", "um44zc2a");

    await fetch("https://api.cloudinary.com/v1_1/doz31bv2b/image/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        console.log("Success:", data.secure_url);
        setImageUrl(data.secure_url); // Update the imageUrl state
        // Save to local storage
        localStorage.setItem("imageURL", JSON.stringify(data.secure_url));

        // Set a timeout to clear the local storage after 10 minutes
        setTimeout(() => {
          localStorage.removeItem("imageURL");
        }, 600000); // 600000 milliseconds = 10 minutes

        // Navigate back to the previous page
        window.history.back();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUpload = async () => {
    try {
      await uploadToCloudinary();
    } catch (error) {
      console.error("Error:", error);
      setOpenErrorSnackbar(true); // Open the Snackbar when there's an error
      setTimeout(() => {
        setOpenErrorSnackbar(false); // Close the Snackbar after 5 seconds
      }, 5000);
    }
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-[100vw] h-screen"
      />
      {/* <button onClick={capture} className='btn btn-primary absolute bottom-2 m-auto rounded-3xl'>Capture</button> */}
      {imgSrc ? (
        <button
          onClick={(e) => {
            e.currentTarget.disabled = true;
            handleUpload();
          }}
          className="btn btn-success m-1 absolute bottom-[3%] left-[50%] transform -translate-x-[50%] z-50"
        >
          Upload to Cloudinary
        </button>
      ) : (
        <IconButton
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "3%",
            transform: "translate(-50%, -50%)",
            color: "Black",
            bgcolor: "white",
            ":hover": {
              bgcolor: "white",
            },
          }}
          className=""
          component="label"
          size="large"
          onClick={capture}
        >
          <CameraAltIcon />
        </IconButton>
      )}

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenErrorSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Failed to upload image. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

export default WebcamCapture;
