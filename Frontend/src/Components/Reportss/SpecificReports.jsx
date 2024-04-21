import React, { useEffect, useState } from 'react';
import CardModel from '../Cards/CardModel';
import th from '/th.jpeg';
import { useParams } from 'react-router-dom';

const PendingReports = () => {
    let DB = [
      {
        id: 0,
        email: "",
        password: "",
        imgUrl: th,
        category: "",
        urgency: "",
        status: "",
        description:
        "qwwwwwwwwwwwertyuioppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppprrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        dateCreated: "",
        targetPopulation: "",
        proposedSolutions: "",
        attachments: [],
        location: "",
      },
      {
        id: 1,
        email: "",
        password: "",
        imgUrl: th,
        category: "",
        urgency: "",
        status: "",
        description:
          "qwwwwwwwwwwwertyuioppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppprrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        dateCreated: "",
        targetPopulation: "",
        proposedSolutions: "",
        attachments: [],
        location: "",
      },
      {
        id: 2,
        email: "",
        password: "",
        imgUrl: th,
        category: "",
        urgency: "",
        status: "",
        description:
          "qwwwwwwwwwwwertyuioppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppprrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        dateCreated: "",
        targetPopulation: "",
        proposedSolutions: "",
        attachments: [],
        location: "",
      },
    ];
      
  const [reports, setReports] = useState(DB);
  const { category } = useParams;

  useEffect(() => {
    let user = localStorage.getItem("currUser");
    user = JSON.parse(user);
    // fetch(`http://localhost:8080/api/gov/query/${category}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Include other headers as necessary
    //   }
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   if (data.length === 0) {
    //     // Handle the case where the array is empty
    //     console.log('No Query Reports'.toUpperCase());
    //   } else {
    //     // Set the reports state to the fetched data
    //     setReports(data);
    //   }
    // })
    // .catch(error => {
    //   console.error('There has been a problem with your fetch operation:', error);
    // });
  }, []); // The empty dependency array ensures this effect runs once after the initial render
    return (
      <div className="row row-cols-1 row-cols row-cols-sm-2 row-cols-md-3  row-cols-xl-5  gap-4 items-center justify-center my-4 p-2">
        {reports.length > 0 ? (
          reports.map((report) => {
            return <CardModel key={report.id} {...report} _id={report.id} />;
          })
        ) : (
          <div className='text-8xl'>No Query Reports</div>
        )}
      </div>
    );
  };
  
  export default PendingReports;
  
