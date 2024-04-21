import React, { useState } from 'react';
import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";


const GovernmentSignUp = ({ toggleFormType }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    department: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    gender: '',
    avatar: null,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const avatar = useFileHandler("single", 2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    // Handle avatar change logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" textAlign="center">
        Government Employee Sign-Up
      </Typography>

      <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
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

        <TextField
          required
          fullWidth
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
        />

        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <TextField
          required
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />

        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <TextField
          required
          fullWidth
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Radio checked={formData.gender === 'male'} onChange={() => setFormData({ ...formData, gender: 'male' })} />}
              label="Male"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Radio checked={formData.gender === 'female'} onChange={() => setFormData({ ...formData, gender: 'female' })} />}
              label="Female"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Radio checked={formData.gender === 'other'} onChange={() => setFormData({ ...formData, gender: 'other' })} />}
              label="Other"
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>

        <Button variant="text" onClick={toggleFormType}>
          Are you a regular user? Sign up here.
        </Button>
      </Stack>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
          Please fill in all required fields.
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

export default GovernmentSignUp;
