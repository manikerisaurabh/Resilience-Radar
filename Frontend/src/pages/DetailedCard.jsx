import React, { useState } from "react";
import th from "/th.jpeg";

const DetailedCard = ({ formData2 = "" }) => {
  const [formData, setFormData] = useState({
    imgUrl: th,
    category: "Education",
    urgency: "Medium",
    status: "Resolved",
    description: "Dummy",
    dateCreated: "04-01-2004",
    targetPopulation: "01",
    proposedSolutions: "be Happy!!",
    attachments: [],
    location: [],
  });

  function onClose() {

  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
        {/* Modal content */}
        <img
          src={formData.imgUrl}
          alt="Report"
          className="w-full h-64 object-cover rounded-t-lg"
        />
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
              <strong>Proposed Solutions:</strong> {formData.proposedSolutions}
            </li>
            <li>
              <strong>Location:</strong> {formData.location}
            </li>
          </ul>
          {formData.attachments.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold">Attachments:</h3>
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
        </div>
        <button onClick={onClose} className="text-danger btn btn-outline-danger ">Close</button>
        <button onClick={onClose} className="text-white btn btn-danger ">Close</button>
      </div>
    </div>
  );
};

export default DetailedCard;
