import React from "react";

const CardModel = ( {  imgSrc, title, description } ) => {
    // console.log(89);
    // console.log({  imgSrc, title, description });
  return (
    <div className="card p-0  max-w-sm col-9 max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#49108B] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
      <img className="w-full" src={imgSrc} alt="Image description" />
      <div className="px-6 py-4 text-[#000]">
        <div className="font-bold text-xl mb-2"> { title } </div>
        <p className="text-[#000] text-base"> { description } </p>
      </div>
    </div>
  );
};

export default CardModel;
