import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"; // Material-UI components
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"; // MUI icons
import MapComponent from "../Maps/MapComponent";

const QueryForm = ({ imageUrl }) => {
  let [loc, setLoc] = useState([74.3501, 16.2229]);

  const [formData, setFormData] = useState({
    imgUrl: imageUrl,
    category: "",
    urgency: "",
    status: "",
    description: "",
    dateCreated: "",
    targetPopulation: "",
    proposedSolutions: "",
    attachments: [],
    location: loc,
  });

  useEffect(() => {
    setFormData({ ...formData, imgUrl: imageUrl, location: loc });
  }, [imageUrl, loc]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileUpload = (selectedFiles) => {
    setFormData({ ...formData, attachments: [...selectedFiles] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === "attachments") {
        for (const file of formData.attachments) {
          data.append("attachments", file);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    data.append("imageUrl", imageUrl);
    data.append("location", loc);

    console.log(formData, data);

    // try {
    //   const response = await fetch("http://localhost:8080/api/query", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     console.log("Query submitted successfully!");
    //     // Clear the form after successful submission (optional)
    //     setFormData({
    //       email: "",
    //       password: "",
    //       imgUrl: "",
    //       category: "",
    //       urgency: "",
    //       status: "",
    //       description: "",
    //       dateCreated: "",
    //       estimatedImpact: "",
    //       targetPopulation: "",
    //       costEstimation: "",
    //       proposedSolutions: "",
    //       attachments: [],
    //     });
    //   } else {
    //     console.error("Error submitting query:", response.statusText);
    //     // Handle submission errors (optional)
    //   }
    // } catch (error) {
    //   console.error("Error submitting query:", error);
    //   // Handle network or other errors (optional)
    // }
  };

  return (
    <>
      <MapComponent loc={loc} setLoc={setLoc} />
      <div className="bg-white p-8 rounded-lg sm:w-[68vw] lg:w-[48vw] my-8 shadow-xl shadow-amber-300 w-96">
        <h2 className="text-2xl font-semibold mb-4">Report an Issue</h2>
        <form className="space-y-4 " onSubmit={handleSubmit}>

          <InputLabel>Image Url: </InputLabel>
          <TextField
            variant="standard"
            fullWidth
            size="small"
            name="imgUrl"
            // disabled // Make the field readonly
            value={formData.imgUrl}
            onChange={handleChange}
            label="img"
            disabled
          />

          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              variant="standard"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="Infrastructure">Infrastructure</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Environment">Environment</MenuItem>
              <MenuItem value="Social Welfare">Social Welfare</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Urgency</InputLabel>
            <Select
              variant="standard"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              variant="standard"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Under Investigation">
                Under Investigation
              </MenuItem>
              <MenuItem value="Proposed Solution">Proposed Solution</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            size="small"
            name="description" // Added name attribute
            value={formData.description}
            onChange={handleChange}
          />

          <InputLabel>Date Created : </InputLabel>
          <TextField
            variant="standard"
            type="date"
            fullWidth
            size="small"
            name="dateCreated"
            value={formData.dateCreated}
            onChange={handleChange}
          />

          <TextField
            label="Target Population"
            variant="outlined"
            type="number"
            fullWidth
            size="small"
            name="targetPopulation" // Added name attribute
            value={formData.targetPopulation}
            onChange={handleChange}
          />

          <TextField
            label="Proposed Solutions"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            size="small"
            name="proposedSolutions" // Added name attribute
            value={formData.proposedSolutions}
            onChange={handleChange}
          />

          <InputLabel>Attachments : </InputLabel>
          <TextField
            label="Attachments"
            variant="standard"
            fullWidth
            size="small"
            type="file"
            accept=".jpg, .jpeg, .png, .pdf"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <div>
            <InputLabel>GeoLocation : {loc} </InputLabel>
          </div>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default QueryForm;
