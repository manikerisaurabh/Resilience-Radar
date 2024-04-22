import React, { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import th from "/th.jpeg";
import { cardDB } from "../../Temp/cardsData";
import CardModel from "./CardModel";

const Cards2 = () => {
  const [cardsData, setCardsData] = useState(cardDB);

  useEffect(() => {
    // Replace 'your-api-route' with the actual route to your API
    fetch("http://localhost:8080/api/query", {
      method: "GET", // or 'POST'
      headers: {
        "Content-Type": "application/json",
        // Include other headers as necessary
        Authorization: "Basic " + btoa("username:password"), // Replace with actual credentials
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCardsData(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);
 
  return (
    <div>
      <div className="row row-cols-1 row-cols row-cols-sm-2 row-cols-md-3  row-cols-xl-5  gap-4 items-center justify-center my-4 p-2">
        {cardsData.map((card) => {
          return (
            <CardModel key={card.id} {...card} _id={card.id} />
          )
        })}
      </div>
    </div>
  );
};

export default Cards2;
