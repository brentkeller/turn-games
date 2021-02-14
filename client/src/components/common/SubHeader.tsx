import * as React from 'react';
import { Link } from 'react-router-dom';

interface SubHeaderProps {
  children?: React.ReactNode;
}

export const SubHeader: React.FC<SubHeaderProps> = ({ children }) => {
  return (
    <header className="text-gray-700 border-t border-b body-font">
      <div className="container flex flex-col flex-wrap pt-2 pb-2 mx-auto md:items-center md:flex-row ">
        <nav className="flex flex-wrap items-center justify-center text-base">
          <Link to="/" className="mr-5 text-sm text-gray-700 rounded-xl hover:text-gray-800">
            Dashboard
          </Link>
          <Link to="/" className="mr-5 text-sm text-gray-700 rounded-xl hover:text-gray-800">
            Projects
          </Link>
          <Link to="/" className="mr-5 text-sm text-gray-700 rounded-xl hover:text-gray-800">
            Settings
          </Link>
          {children}
        </nav>
      </div>
    </header>
  );
};

interface SubHeaderLinkProps {
  href: string;
  label: string;
}

export const SubHeaderLink: React.FC<SubHeaderLinkProps> = ({ href, label }) => {
  return (
    <Link to={href} className="mr-5 text-sm text-gray-700 rounded-xl hover:text-gray-800">
      {label}
    </Link>
  );
};
