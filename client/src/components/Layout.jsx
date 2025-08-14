// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Chatbot from './Chatbot';
import Navbar from './Navbar'; 

const Layout = () => (
  <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
    <Navbar /> 

    <main className="flex-grow pt-20 px-4 md:px-8"> 
      <Outlet />
    </main>

    <Footer />
    <Chatbot />
  </div>
);

export default Layout;
