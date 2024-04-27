import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/UseCurrentUser";
const Sidebar = ({ isEm, visible, setSidebar, setDisplayQueryType }) => {
  const currentUser = useCurrentUser();
  const [isEmp, setIsEmp] = useState(false);
  const [id, setId] = useState("");

  function setEMP(value) {
    setIsEmp(value);
  }

  useEffect(() => {
    console.log('currentUser:', currentUser);
    if (currentUser) {
      console.log('isGovEmp:', currentUser.isGovEmp); // Check the value of currentUser.isGovEmp
      console.log('condition:', currentUser.isGovEmp == "true"); // Check the value of currentUser.isGovEmp
      setEMP(currentUser.isGovEmp == "true")
      setId(currentUser._id)
      console.log('isEmp:', isEmp);
    }
  }, [currentUser, isEmp]);

  useEffect(() => {
    console.log(isEmp);
  }, [isEmp]);





  return (
    <>
      <div
        className={`h-full fixed top-[64px] z-20 bg-gray-800 sm:w-1/3 lg:w-1/4 w-full ${visible ? "translate-x-0" : "-translate-x-full"
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
          {!isEmp && (
            <Link
              to={`/query/1`}
              className="text-decoration-none text-white"
              onClick={setSidebar}
            >
              <li className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110">
                Upload Report
              </li>
            </Link>
          )}
          <Link className="text-decoration-none text-white">
            <li
              className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setSidebar();
                setDisplayQueryType((prev) => {
                  return {
                    totalQueries: true,
                    postedQueries: false,
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
          {!isEmp && <Link className="text-decoration-none text-white">
            <li
              className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setSidebar();
                setDisplayQueryType((prev) => {
                  return {
                    totalQueries: false,
                    postedQueries: true,
                    pendingQueries: false,
                    departmentQueries: false,
                    assignedQueries: false,
                    completedQuerirs: false,
                    toApproveQueries: false,
                  };
                });
              }}
            >
              Posted Report
            </li>
          </Link>}
          <Link className="text-decoration-none text-white">
            <li
              className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
              onClick={() => {
                setSidebar();
                setDisplayQueryType((prev) => {
                  return {
                    postedQueries: false,
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
          {isEmp && (
            <Link className="text-decoration-none text-white">
              <li
                className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
                onClick={() => {
                  setSidebar();
                  setDisplayQueryType((prev) => {
                    return {
                      postedQueries: false,
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
            </Link>
          )}
          {!isEmp && (
            <Link className="text-decoration-none text-white">
              <li
                className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
                onClick={() => {
                  setSidebar();
                  setDisplayQueryType((prev) => {
                    return {
                      postedQueries: false,
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
            </Link>
          )}
          {isEmp && (
            <Link className="text-decoration-none text-white">
              <li
                className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
                onClick={() => {
                  setSidebar();
                  setDisplayQueryType((prev) => {
                    return {
                      postedQueries: false,
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
            </Link>
          )}
          {!isEmp && (
            <Link className="text-decoration-none text-white">
              <li
                className="py-4 text-xl border-gray-800 border-y-[1px] hover:border-white font-semibold transition duration-300 ease-in-out transform hover:scale-110"
                onClick={() => {
                  setSidebar();
                  setDisplayQueryType((prev) => {
                    return {
                      postedQueries: false,
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
            </Link>
          )}
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
