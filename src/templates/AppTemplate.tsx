import React from 'react';
import { Navbar } from '../organisums/Navbar';
import Footer from '../organisums/Footer';

interface AppTemplateProps {
  children: React.ReactNode;
}

export const AppTemplate: React.FC<AppTemplateProps> = ({ children }) => {

  return (
  <div className=" bg-gray-50">
    <Navbar />
    <main className="py-1 ">{children}</main>
    <Footer />
  </div>
)};