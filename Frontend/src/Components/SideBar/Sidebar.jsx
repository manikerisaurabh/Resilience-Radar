import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isEmp, visible, setSidebar, setDisplayQueryType }) => {
  console.log("sidebar");

  return (
    <>
      <div
        className={`h-full fixed top-[64px] z-20 bg-gray-800 sm:w-1/3 lg:w-1/4 w-full ${
          visible ? "translate-x-0" : "-translate-x-full"
        } transition duration-400 ease-in`}
      >
        <div className="text-right p-2 font-semibold">
          <button
            className="text-white close-btn rounded-md transition duration-500 border-1 border-gray-800 hover:border-white py-2 px-3"
            onClick={setSidebar}
          >
            X
          </button>
        </div>
        <ul className="text-center p-0">
          {!isEmp && <Link
            to="/query"
            className="text-decoration-none text-white"
            onClick={setSidebar}
          >
            <li className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110">
              Upload Report
            </li>
          </Link>}
          <Link className="text-decoration-none text-white">
            <li
              className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setSidebar();
                setDisplayQueryType((prev) => {
                  return {
                    totalQueries: true,
                    pendingQueries: false,
                    departmentQueries: false,
                    assignedQueries: false,
                    completedQuerirs: false,
                    toApproveQueries: false,
                  };
                });
              }}
            >
              Total Report
            </li>
          </Link>
          <Link className="text-decoration-none text-white">
            <li
              className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setSidebar();
                setDisplayQueryType((prev) => {
                  return {
                    totalQueries: false,
                    pendingQueries: true,
                    departmentQueries: false,
                    assignedQueries: false,
                    completedQuerirs: false,
                    toApproveQueries: false,
                  };
                });
              }}
            >
              Pending Report
            </li>
          </Link>
          {isEmp && <Link className="text-decoration-none text-white">
            <li
              className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setSidebar();
                setDisplayQueryType((prev) => {
                  return {
                    totalQueries: false,
                    pendingQueries: true,
                    departmentQueries: true,
                    assignedQueries: false,
                    completedQuerirs: false,
                    toApproveQueries: false,
                  };
                });
              }}
            >
              Department Report
            </li>
          </Link>}
          {!isEmp && <Link className="text-decoration-none text-white">
            <li
              className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setSidebar();
                setDisplayQueryType((prev) => {
                  return {
                    totalQueries: false,
                    pendingQueries: false,
                    departmentQueries: false,
                    assignedQueries: false,
                    completedQuerirs: false,
                    toApproveQueries: true,
                  };
                });
              }}
            >
              Approve Request
            </li>
          </Link>}
          {isEmp && <Link className="text-decoration-none text-white">
            <li
              className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setSidebar();
                setDisplayQueryType((prev) => {
                  return {
                    totalQueries: false,
                    pendingQueries: false,
                    departmentQueries: false,
                    assignedQueries: true,
                    completedQuerirs: false,
                    toApproveQueries: false,
                  };
                });
              }}
            >
              Assigned Reports
            </li>
          </Link>}
          {!isEmp && <Link className="text-decoration-none text-white">
            <li
              className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setSidebar();
                setDisplayQueryType((prev) => {
                  return {
                    totalQueries: false,
                    pendingQueries: false,
                    departmentQueries: false,
                    assignedQueries: false,
                    completedQuerirs: true,
                    toApproveQueries: false,
                  };
                });
              }}
            >
              Completed Report
            </li>
          </Link>}
          <li className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110">
            <a
              href="#pending"
              className="text-decoration-none text-white"
              onClick={setSidebar}
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
