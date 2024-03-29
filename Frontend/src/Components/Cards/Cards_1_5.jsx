import React from "react";
import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css"; // Import slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import slick carousel theme styles
import { cardDB } from "../../Temp/cardsData";
import CardModel from "./CardModel";

const Cards_1_5 = () => {
  // Slick settings for the carousel
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop
    speed: 300, // Transition speed (milliseconds)
    slidesToShow: 3, // Number of cards to show at once
    slidesToScroll: 3, // Number of cards to scroll per click
  };

  return (
    <div className="my-4 mt-8">
      <Slider {...settings}>
        {cardDB.map((card) => (
          <div key={card.id}>
            <CardModel {...card} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Cards_1_5;
