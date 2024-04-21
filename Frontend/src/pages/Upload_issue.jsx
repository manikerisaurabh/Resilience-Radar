import React, { useState } from 'react';
import WebcamCapture from '../Components/Media/WebcamCapture ';
import QueryForm from '../Components/Form/QueryForm';
import { useParams } from 'react-router-dom';

const Upload_issue = () => {
  const [imageUrl, setImageUrl] = useState("");

  let { key } = useParams();
  console.log(key);
  return (
      <QueryForm imageUrl={imageUrl} />
  );
};

export default Upload_issue;