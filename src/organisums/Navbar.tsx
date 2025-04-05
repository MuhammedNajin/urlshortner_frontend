import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
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

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="ml-2 text-lg font-bold text-gray-800">ShortLink</span>
            </div>
          </div>

          <div className="flex items-center mt-2">
            {!user && (
              <>
                <Heading className="text-sm font-normal" level={4}>
                  New to ShortLink?
                </Heading>
                <Button
                  onClick={() => navigate('/signup')}
                  className="ml-4 bg-white text-gray-600 hover:text-gray-800 focus:outline-none border border-gray-200 hover:border-gray-300 hover:bg-gray-300 rounded-md px-4 py-2"
                >
                  Create an account
                </Button>
              </>
            )}

            {user && (
              <div className="hidden md:ml-4 md:flex md:items-center">
                <button
                  onClick={handleLogout}
                  className="ml-3 p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            )}

            <div className="md:hidden flex items-center">
              <Button
                onClick={() => setIsOpen((prev) => !prev)}
                className="ml-4 p-2 text-gray-600 hover:text-gray-800"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
