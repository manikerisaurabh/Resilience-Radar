import React, { useRef, useState } from 'react';
import Webcam from "react-webcam";

const WebcamCapture = ({ onImageUpload }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State for the uploaded image URL

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append('file', imgSrc);
    data.append('upload_preset', 'um44zc2a');

    await fetch('https://api.cloudinary.com/v1_1/doz31bv2b/image/upload', {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      console.log('Success:', data.secure_url);
      setImageUrl(data.secure_url); // Update the imageUrl state
      onImageUpload(data.secure_url); // Pass the URL to Upload_issue
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleUpload = async () => {
    try {
      await uploadToCloudinary();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture} className='btn btn-primary m-1'>Capture photo</button>
      {imgSrc && (
        <>
          <img src={imgSrc} alt="Captured" />
          <button onClick={handleUpload} className='btn btn-success m-1'>Upload to Cloudinary</button>
        </>
      )}
    </>
  );
};

export default WebcamCapture;
