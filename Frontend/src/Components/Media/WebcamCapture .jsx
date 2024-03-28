import React, { useRef, useState } from 'react';
import Webcam from "react-webcam";

const WebcamCapture = ({ onImageUpload }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  // const [imageUrl, setImageUrl] = useState(""); // Add a state for the image URL

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const uploadToCloudinary = () => {
    const data = new FormData();
    data.append('file', imgSrc);
    data.append('upload_preset', 'um44zc2a');

    fetch('https://api.cloudinary.com/v1_1/doz31bv2b/image/upload', {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      console.log('Success:', data.secure_url);
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleUpload = async () => {
    try {
        const imageUrl = await uploadToCloudinary();
        onImageUpload(imageUrl); // Pass the URL to Upload_issue
    } catch (error) {
        // Handle upload error
    }
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <>
          <img src={imgSrc} alt="Captured" />
          <button onClick={handleUpload}>Upload to Cloudinary</button>
        </>
      )}
    </>
  );
};

export default WebcamCapture;
