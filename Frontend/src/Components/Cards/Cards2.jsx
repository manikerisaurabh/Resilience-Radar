import React, { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import th from "/th.jpeg";
import { cardDB } from "../../Temp/cardsData";
import CardModel from "./CardModel";

const Cards2 = () => {
  const [cardsData, setCardsData] = useState(cardDB);

  useEffect(() => {
    try {
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
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="mt-[80px]">
      <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-xl-5  gap-4 items-center justify-center my-4 p-2 ">
        {cardsData.map((card) => {
          return (
            <CardModel key={card._id} {...card} _id={card._id} />
          )
        })}
      </div>
    </div>
  );
};

export default Cards2;
