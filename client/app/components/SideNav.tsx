import React, { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-64 bg-white border-r overflow-y-auto lg:block`}
      >
        {/* Your sidebar content goes here */}
        <div className="p-4">
          <h1 className="text-lg font-bold">Sidebar</h1>
          {/* Add your navigation links here */}
          <ul>
            <li className="py-2">
              <a href="#" className="text-gray-800 hover:text-blue-600">
                Home
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-gray-800 hover:text-blue-600">
                About
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-gray-800 hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b">
          <button
            className="text-gray-600 lg:hidden px-4 py-3"
            onClick={toggleNav}
          >
            {/* Hamburger menu icon */}
            {isOpen ? (
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6 fill-current "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.293 7.293a1 1 0 011.414 0L12 14.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4">{/* Your main content goes here */}</div>
      </div>
    </div>
  );
};

export default SideNav;
