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
      <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-5 gap-3 items-center justify-center my-4">
        <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#49108B] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img className="w-full" src={th} alt="Image description" />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#000000] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img className="w-full" src={th} alt="Image description" />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-amber-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img className="w-full" src={th} alt="Image description" />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-lime-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img className="w-full" src={th} alt="Image description" />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#49108B] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img className="w-full" src={th} alt="Image description" />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#49108B] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img className="w-full" src={th} alt="Image description" />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#49108B] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img className="w-full" src={th} alt="Image description" />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#49108B] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img className="w-full" src={th} alt="Image description" />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#49108B] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img className="w-full" src={"/th.jpeg"} alt="Image description" />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        {cardsData.map((card) => {
          return <CardModel key={card.id} {...card} />;
        })}
      </div>
    </div>
  );
};

export default Cards2;
