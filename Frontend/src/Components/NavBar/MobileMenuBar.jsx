import React from "react";


const MenuBarUtilites = "no-underline text-center w-full text-gray-300 hover:bg-gray-700 hover:text-white px-3 block py-2 rounded-md text-base font-medium";

const MobileMenuBar = () => {
    console.log("Menu");
  return (
    <div>
      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 flex flex-col space-y-1">
          {/* <!-- Mobile Navigation Links --> */}
          <a href="/home" className={MenuBarUtilites}>
            Home
          </a>
          <a href="/about" className={MenuBarUtilites}>
            About
          </a>
          <a href="/signin" className={MenuBarUtilites}>
            Sign In
          </a>
          <a href="/login" className={MenuBarUtilites}>
            Login
          </a>
          {/* <!-- ... other navigation links ... --> */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuBar;
