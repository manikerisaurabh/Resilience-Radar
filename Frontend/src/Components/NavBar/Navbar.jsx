import React, { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import MobileMenuBar from './MobileMenuBar';
import { Link } from "react-router-dom";

const Navbar = ({ dabba_ve }) => {
  let [clicked, setClicked] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setClicked(inView);
  }, [inView]);

  {console.log("Navbar")}
  return (
    // <!-- Navbar -->
    <nav className="fixed top-0 left-0 w-full z-10 bg-gray-800 border-b-[1px] border-b-black border-opacity-30 shadow-black">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* <!-- Mobile menu button--> */}
          <div className="inset-y-0 left-0 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              // onClick={() => {setClicked(!clicked)}}
              onClick={() => {
                dabba_ve();
              }}
            >
              <span className="sr-only">Open main menu</span>
              {/* <!-- Icon for the menu bar on mobile --> */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              {/* <!-- Icon for the close button on mobile --> */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* <!-- Logo --> */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center text-white p-2">
              {/* <img className="block lg:hidden h-8 w-auto text-blue-600" src="/your-logo.png" alt="Your Logo" /> */}
              <h2>
                <a
                  href=""
                  className="first-letter:text-white no-underline text-yellow-600 "
                >
                  Resilience Radar
                </a>
              </h2>
              {/* <img className="hidden lg:block h-8 w-auto text-blue-600" src="/your-logo.png" alt="Your Logo" /> */}
            </div>
            <div className="hidden sm:block sm:ml-6 flex my-auto">
              <div className="flex space-x-3 py-1 items-center justify-center">
                {/* <!-- Navigation Links --> */}
                <a
                  href="/about"
                  className="first-letter:text-yellow-600 no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                {/* <!-- ... other navigation links ... --> */}
              </div>
            </div>
          </div>
          {/* <!-- Sign in and Login links --> */}
          <div className="hidden sm:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link to="/auth/Signup" className="no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Sign In</Link>
            <Link to="/auth/Login" className="no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
          </div>
        </div>
      </div>
      {clicked && <MobileMenuBar />}
    </nav>
  );
};

export default Navbar;
