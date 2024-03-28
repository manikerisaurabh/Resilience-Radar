import React, { useState } from 'react';
import WebcamCapture from '../Components/Media/WebcamCapture ';
import QueryForm from '../Components/Form/QueryForm';

const Upload_issue = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className='flex flex-col items-center min-h-fit p-10 justify-center'>
      <WebcamCapture onImageUpload={setImageUrl} />
      <QueryForm imageUrl={imageUrl} />
    </div>
  );
};

export default Upload_issue;