
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
import { Link, useParams } from "react-router-dom";
import MapComponent from "../Maps/MapComponent";
import WebcamCapture from "../Media/WebcamCapture ";
import CheckIcon from "@mui/icons-material/Check";
import th from "/th.jpeg";

const QueryForm = ({
  category = "",
  urgency = "",
  status = "",
  description = "",
  dateCreated = "",
  targetPopulation = "",
  proposedSolutions = "",
  attachments = [],
  location = [],
}) => {
  let [loc, setLoc] = useState([74.3501, 16.2229]);
  let [cam, setCam] = useState(false);
  let [userInfo, setUserInfo] = useState(null);
  let [raisedBy, setRaisedBy] = useState("");
  let [queryid, setQueryid] = useState("");
  const [formData, setFormData] = useState({
    _id: "1",
    img: "",
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
  const [imageUrl, setImageUrl] = useState(th);
  // const [imageUrl, setImageUrl] = useState(th);
  let { key } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/query/edit/${key}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRaisedBy(data.raisedBy);
        setQueryid(data._id);
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    try {
      const userData = localStorage.getItem("currUser");
      console.log(JSON.parse(userData));
      setUserInfo(
        userData
          ? JSON.parse(userData)
          : {
            _id: "1",
            img: imageUrl,
            category: "",
            urgency: "",
            status: "",
            description: "",
            dateCreated: "",
            targetPopulation: "",
            proposedSolutions: "",
            attachments: [],
            location: loc,
          }
      );
      // setLoc(storedLoaction ? JSON.parse(storedLoaction) : loc);
      setFormData(
        userInfo
          ? {
            ...userInfo,
            img: imageUrl,
            category: category,
            urgency: urgency,
            status: status,
            description: description,
            dateCreated: dateCreated,
            targetPopulation: targetPopulation,
            proposedSolutions: proposedSolutions,
            attachments: attachments,
            location: loc,
            raisedBy: raisedBy,
            queryId: queryid
          }
          : {
            _id: "1",
            img: imageUrl,
            category: category,
            urgency: urgency,
            status: status,
            description: description,
            dateCreated: dateCreated,
            targetPopulation: targetPopulation,
            proposedSolutions: proposedSolutions,
            attachments: attachments,
            location: loc,
            raisedBy: raisedBy,
            queryId: queryid
          }
      );
      console.log(userInfo);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  }, [raisedBy, queryid]);

  useEffect(() => {
    const uImg = localStorage.getItem("imageURL");
    setImageUrl(uImg);
    setFormData({ ...formData, img: uImg, location: loc });

  }, [imageUrl]);

  useEffect(() => {
    let storedLocation = localStorage.getItem("userLocation");
    console.log(JSON.parse(storedLocation));
    console.log(storedLocation ? JSON.parse(storedLocation) : [74.3501, 16.2229]);
    setLoc(storedLocation ? JSON.parse(storedLocation) : [74.3501, 16.2229]);
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileUpload = (selectedFiles) => {
    setFormData({ ...formData, attachments: [...selectedFiles] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData, userInfo);
    console.log("this is image url : " + imageUrl);
    setFormData({ ...formData, img: imageUrl });
    console.log(key == "1");
    console.log(key);
    let ul = (key == "1")
     ? `http://localhost:8080/api/query/add/${userInfo._id}`
      : `http://localhost:8080/api/query/edit/${userInfo._id}`
    let method = key != 1 ? "PUT" : "POST";
    console.log("thus is  url: " + ul)

    console.log(formData, userInfo, JSON.stringify(formData), key, ul, method);
    try {
      const response = await fetch(ul, {
        method: method,
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log("Query submitted successfully!");
        window.history.back();
        // Clear the form after successful submission (optional)
        setFormData({
          _id: "",
          email: "",
          password: "",
          img: false,
          category: "",
          urgency: "",
          status: "",
          description: "",
          dateCreated: "",
          estimatedImpact: "",
          targetPopulation: "",
          costEstimation: "",
          proposedSolutions: "",
          attachments: [],
        });
      } else {
        console.error("Error submitting query Text:", response.statusText);
        // Handle submission errors (optional)
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      // Handle network or other errors (optional)
    }
  };

  return (
    <>
      {cam && (
        <div className="fixed z-40 bg-white">
          <WebcamCapture onImageUpload={setImageUrl} />
        </div>
      )}

      <div className="flex flex-col items-center bg-[#b7dce3cc] min-h-fit p-10 justify-center">
        <div className="bg-white p-8 rounded-lg sm:w-[68vw] lg:w-[48vw] my-8 shadow-2xl shadow-[#23a4bdd1] w-96">

          <h2 className="text-2xl font-semibold mb-4">Report an Issue</h2>
          <form className="space-y-4 " onSubmit={handleSubmit}>
            {/* <InputLabel>Image Url: </InputLabel> */}
            <TextField
              variant="standard"
              fullWidth
              size="small"
              name="imgUrl"
              value={formData.img}
              onChange={handleChange}
              label={formData.img ? "" : "Image Url"}
              className="mt-0 mb-1"
              disabled
            />
            <Link to="/CaptureImg" className="">
              <Button variant="contained" color="primary" type="button">
                upload Image
              </Button>
            </Link>

            <div>
              <InputLabel className="">
                {/* GeoLocation : {loc[0] + " " + loc[1]}{" "} */}
                {loc[0] &&
                  <>
                    GeoLocation : {loc[0] + " " + loc[1]}{" "}
                  </>
                }
              </InputLabel>

              <div className="border hover:border-blue-500 rounded w-fit">
                <Link
                  to="/util/Location"
                  className="btn btn-close-white border-0"
                >
                  {location ? "Update Current Location" : "Add Location"}
                </Link>
              </div>
            </div>

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
              className="mt-0"
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default QueryForm;