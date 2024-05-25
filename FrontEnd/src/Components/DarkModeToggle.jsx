import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      className="p-2 rounded-full focus:outline-none"
      onClick={() => setDarkMode(!darkMode)}
    >
      <FontAwesomeIcon 
        icon={darkMode ? faSun : faMoon} 
        className={`text-xl ${darkMode ? 'text-yellow-400' : 'text-gray-900'}`} 
      />
    </button>
  );
};

export default DarkModeToggle;
