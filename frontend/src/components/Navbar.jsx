import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const activeClass = "text-blue-600 border-b-2 border-blue-600";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-pink-600 cursor-pointer" onClick={() => navigate('/')}>
            DreamEvents!
          </div>

          {/* Centered Links */}
          <ul className="hidden md:flex space-x-6">
            {['/', '/weddings', '/about', '/contact', '/booking'].map((path, index) => {
              const labels = ['Home', 'Weddings', 'About', 'Contact', 'Book Event'];
              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      "px-3 py-2 rounded-md font-medium " + (isActive ? activeClass : "text-gray-700 hover:text-blue-600")
                    }
                  >
                    {labels[index]}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Register/Login buttons (right) */}
          {/* <div className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              Register
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div> */}

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-2xl text-gray-700">
              {open ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <ul className="flex flex-col mt-2 space-y-2 md:hidden">
            {['/', '/weddings', '/about', '/contact', '/booking'].map((path, index) => {
              const labels = ['Home', 'Weddings', 'About', 'Contact', 'Book Event'];
              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      "block px-3 py-2 rounded-md " + (isActive ? activeClass : "text-gray-700 hover:text-blue-600")
                    }
                    onClick={() => setOpen(false)}
                  >
                    {labels[index]}
                  </NavLink>
                </li>
              );
            })}
            <li>
              {/* <button
                onClick={() => {
                  navigate('/register');
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Register
              </button> */}
            </li>
            <li>
              {/* <button
                onClick={() => {
                  navigate('/login');
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </button> */}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;