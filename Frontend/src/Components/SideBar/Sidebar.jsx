import React from "react";
import { Link } from 'react-router-dom'

const Sidebar = ({ visible, setSidebar }) => {
  console.log("sidebar");

  return (
    <>
      <div className={`h-full fixed top-[64px] z-20 bg-gray-800 sm:w-1/3 lg:w-1/4 w-full ${visible ? "translate-x-0" : "-translate-x-full"} transition duration-1000 ease-in-out`}>

        <div className="text-right p-2 font-semibold">
          <button className="text-white close-btn rounded-md transition duration-500 border-1 border-gray-800 hover:border-white py-2 px-3"
            onClick={setSidebar}
          >
            X
          </button>
        </div>
        <ul className="text-center p-0">
          <li className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110">
            <Link to="/query" className="text-decoration-none text-white" onClick={setSidebar}>
              Upload Report
            </Link>
          </li>
          <li className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110">
            <Link to="/pending" className="text-decoration-none text-white" onClick={setSidebar}>
              Pending Report
            </Link>
          </li>
          <li className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110">
            <a href="#completed" className="text-decoration-none text-white" onClick={setSidebar}>
              Completed
            </a>
          </li>
          <li className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110">
            <a href="#pending" className="text-decoration-none text-white" onClick={setSidebar}>
              Contact Us
            </a>
          </li>
        </ul>

      </div>

    </>
  );
};

export default Sidebar;
