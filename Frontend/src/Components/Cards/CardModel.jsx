import React from "react";
import th from "/th.jpeg";
import { Link } from "react-router-dom";

const CardModel = ({ category, description, targetPopulation, img, _id, canCommit, tooApprove }) => {
  // console.log(89);
  // console.log({  imgSrc, title, description });
  console.log(_id)
  return (
    <Link to={canCommit ? `/DetailedData/${_id}/EnA` : (tooApprove) ? `/DetailedData/${_id}/ApproveRequest` :`/DetailedData/${_id}/CommitReport`} className="flex items-center justify-center no-underline ">
      <div className="card p-0 max-w-sm sm:max-h-[368px] min-h-[368px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea] ">
        <img className="w-full h-[23vh] p-0 m-0" src={img} alt="Image description" />
        <div className="px-6 py-4 text-[#000]">
          <div className="font-bold text-xl mb-2">{category}</div>
          <p className="text-[#000] text-sm mt-auto text-wrap">Target Population : {targetPopulation}</p>
          <p className="text-[#000] text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardModel;