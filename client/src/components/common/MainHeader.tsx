import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../auth/userContext';

interface MainHeaderProps {}

export const MainHeader: React.FC<MainHeaderProps> = ({}) => {
  const { user } = React.useContext(UserContext);
  const isLoggedIn = user !== undefined;

  return (
    <header className="text-gray-700 bg-white border-t border-b body-font">
      <div className="container flex flex-col flex-wrap pt-3 pb-3 mx-auto md:items-center md:flex-row ">
        <Link
          to="/"
          className="flex items-center w-40 mb-4 font-medium text-gray-900 title-font md:mb-0"
        >
          Turn Games
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
          <Link to="/" className="mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800">
            Pricing
          </Link>
          <Link to="/" className="mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800">
            Contact
          </Link>
          <Link to="/" className="mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800">
            Services
          </Link>
        </nav>
        <button className="flex items-center px-4 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform rounded-lg l bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">
          Join Game
        </button>
        <button className="flex items-center ml-2 px-4 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform rounded-lg l bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">
          Create Game
        </button>
        {!isLoggedIn && (
          <button className="flex items-center ml-2 px-4 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform rounded-lg l bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">
            Sign in
          </button>
        )}
        {isLoggedIn && (
          <button
            className="flex ml-3 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <span className="w-8 h-8 border border-white rounded-full">BK</span>
          </button>
        )}
      </div>
    </header>
  );
};
