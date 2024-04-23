import React, { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import th from "/th.jpeg";
import { cardDB } from "../../Temp/cardsData";
import CardModel from "./CardModel";

const Cards2 = (ul) => {
  const [cardsData, setCardsData] = useState(cardDB);

  useEffect(() => {
    try {
      fetch(ul, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log(response);
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

  console.log(cardsData);

  return (
    <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5  row-cols-xl-5  gap-4 items-center justify-center my-4 p-2 ">
      {cardsData.map((card) => {
        return <CardModel key={card._id} {...card} _id={card._id} />;
      })}
    </div>
  );
};

export default Cards2;
