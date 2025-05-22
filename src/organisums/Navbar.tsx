import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, History, Menu, X } from 'lucide-react';
import { logout } from '../redux/reducer/authSlice';
import { Heading } from '../atoms/Heading';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const handleHistory = () => {
    navigate('/history');
    setIsOpen(false); // Close mobile menu
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="ml-2 text-lg font-bold text-gray-800">ShortLink</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              {!user ? (
                <>
                  <Heading className="text-sm font-normal text-gray-600" level={4}>
                    New to ShortLink?
                  </Heading>
                  <Button
                    onClick={() => navigate('/signup')}
                    className="bg-white text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 rounded-md px-4 py-2 transition-colors"
                  >
                    Create an account
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleHistory}
                    className="flex items-center text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 transition-colors"
                    aria-label="View URL history"
                  >
                    <History className="w-5 h-5 mr-2" />
                    <span>History</span>
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-white bg-gray-100 hover:bg-red-500 rounded-md px-3 py-2 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    <span>Logout</span>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button
                onClick={toggleMenu}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {!user ? (
              <>
                <Button
                  onClick={() => {
                    navigate('/signup');
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-gray-600 hover:text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 rounded-md px-4 py-2 transition-colors"
                >
                  Create an account
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleHistory}
                  className="w-full flex items-center text-gray-600 hover:text-gray-800 bg-white hover:bg-gray-100 rounded-md px-4 py-2 transition-colors"
                >
                  <History className="w-5 h-5 mr-2" />
                  <span>History</span>
                </Button>
                <Button
                  onClick={handleLogout}
                  className="w-full flex items-center text-gray-600 hover:text-white bg-white hover:bg-red-500 rounded-md px-4 py-2 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};