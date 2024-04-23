import React, { useState, useEffect } from "react";
import { CircularProgress, Alert, AlertTitle } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import th from "/th.jpeg";
import {
  AlignVerticalBottomRounded,
  ArrowLeftRounded,
  TaxiAlertRounded,
} from "@mui/icons-material";

const DetailedCard = () => {
  const [formData1, setFormData1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    _id: "1",
    raisedBy: "S39NKSLND99a",
    queryId: "jksjddi8",
    latitude: "16.18823123",
    longitude: "74.46123123",
    imgUrl: th,
    category: "Education",
    urgency: "Medium",
    status: "Resolved",
    description: "Dummy",
    dateReported: "04-01-2004",
    targetPopulation: "01",
    proposedSolutions: "be Happy!!",
    attachments: [],
    location: [],
  });
  let [userInfo, setUserInfo] = useState(null);
  let { key } = useParams();

  useEffect(() => {
    try {
      const storedLocation = localStorage.getItem("userLocation");
      console.log(storedLocation);
      setUserInfo(storedLocation ? JSON.parse(storedLocation) : null)
    } catch (error) {
      console.log(error);
    }

    fetch(`http://localhost:8000/api/query/edit/${key}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
        setError(true);
      });
    setLoading(false);
  }, []);

  function onClose() {
    window.history.back();
  }

  function assignTask() {
    try {
      fetch(`http://localhost:8000/api/gov/query/assign`, {
        method: "POST",
        body: {
          queryId: userInfo.queryId,
          empId: userInfo.empId
        }
      })
    } catch (error) {

    }
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress size={"8rem"} color={"warning"} />
      </div>
    );
  }

  // if (error) {
  //   setTimeout(() => {
  //     window.history.back();
  //   }, 8000)
  //   return (
  //     <Alert severity="error">
  //       <AlertTitle>Error</AlertTitle>
  //       Something went wrong — please try again later.
  //       <ArrowLeftRounded></ArrowLeftRounded>
  //       redirecting to the home page...
  //     </Alert>
  //   );
  // }

  console.log(key);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <img src={formData.imgUrl} alt="" className="w-full opacity-85" />
      <div className="absolute bg-white h-screen w-[100vw] rounded-lg max-w-4xl overflow-auto scrollbar-fade">
        {/* Modal content */}
        <div className="fixed right-0">
          <button
            onClick={onClose}
            className=" btn w-[40px] btn-danger hover:text-white"
          >
            X
          </button>
          {/* <button onClick={onClose} className="text-white btn w-[70px] btn-danger ">Close</button> */}
        </div>
        <img
          src={formData.imgUrl}
          alt="Report"
          className="w-full h-[50%] object-cover"
        />
        <div className="px-8 py-1">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">
              {formData.category || "Category"}
            </h2>
            <p className="text-base mb-4">{formData.description}</p>
            <ul>
              <li>
                <strong>Urgency:</strong> {formData.urgency}
              </li>
              <li>
                <strong>Status:</strong> {formData.status}
              </li>
              <li>
                <strong>Date Created:</strong> {formData.dateCreated}
              </li>
              <li>
                <strong>Target Population:</strong> {formData.targetPopulation}
              </li>
              <li>
                <strong>Proposed Solutions:</strong>{" "}
                {formData.proposedSolutions}
              </li>
              <li>
                <strong>Location:</strong>{" "}
                {`${formData.location.village}, ${formData.location.state}, ${formData.location.country}`}
              </li>
            </ul>
            h
            h<br></br>h<br/> h
            {formData.attachments.length > 0 && (
              <div className="p-4">
                <h3 className="text-2xl font-bold mb-2">Attachments:</h3>
                {formData.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    Attachment {index + 1}
                  </a>
                ))}
              </div>
            )}
            <div className=" flex gap-2 items-center justify-center">
              {!userInfo.isGovEmp && <Link
                to={`/query/edit/${key}`}
                className="text-white btn w-[70px] btn-primary col-3"
              >
                <button onClick={onClose} className="">
                  Edit
                </button>
              </Link>}
              {userInfo.isGovEmp && <div
                className="text-white btn w-[70px] btn-primary col-3"
              >
                <button onClick={assignTask} className="">
                  Assign
                </button>
              </div>}
              <button
                onClick={onClose}
                className="text-white btn w-[70px] btn-danger col-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
