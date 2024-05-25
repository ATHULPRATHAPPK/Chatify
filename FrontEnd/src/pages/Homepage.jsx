import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../Components/DarkModeToggle'; // Import the DarkModeToggle component

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'dark' : ''} ${darkMode ? ' bg-gray-700' : 'bg-gray-100'} min-h-screen flex flex-col justify-center items-center`}>
      <div className="absolute top-4 right-4">
        {/* Replace the FontAwesomeIcon with DarkModeToggle component */}
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <h1 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome to Chatify</h1>
      <div className={`max-w-lg mx-auto text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
        <p className="text-lg">Chatify is a messaging application that allows you to chat with your friends and family in real-time.</p>
        <p className="text-lg mt-4">Features:</p>
        <ul className="text-lg">
          <li>Real-time chatting</li>
          <li>Group messaging</li>
          <li>Emoji support</li>
          <li>File sharing</li>
          <li>Customizable themes</li>
        </ul>
      </div>
      <Link to="/userlogin" className={`px-6 py-3 rounded-md text-lg hover:bg-blue-600 transition duration-200 ${darkMode ? 'bg-white text-gray-900' : 'bg-blue-500 text-white'}`}>
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;
