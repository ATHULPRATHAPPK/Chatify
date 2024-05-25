import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle'; // Import the DarkModeToggle component
import loginGif from '../assets/loginGif.gif'; // Import the GIF

const userURL = 'http://localhost:3001/api/users';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const userData = {
      email: email,
      password: password,
    };

    if (!isLogin) {
      userData.name = name;
    }

    try {
      const response = await axios.post(
        `${userURL}/${isLogin ? 'userlogin' : 'usersignup'}`,
        userData,
        {
          withCredentials: true,
        }
      );
      console.log('Data sent successfully:', response);

      navigate('/UserProfilePage');
    } catch (error) {
      console.error('There was an error sending the data:', error);
      const errorMessage = error.response?.data?.message || 'There was an error sending the data';
      setError(errorMessage);
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="absolute top-4 right-4">
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">{isLogin ? 'Login' : 'Signup'} Page</h2>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <img src={loginGif} alt="Login Gif" className="bg-cover bg-center  mb-4 mx-auto" /> {/* Added GIF */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                {isLogin ? 'Login' : 'Signup'}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600 dark:text-gray-300">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <button
              type="button"
              className="mt-2 w-full flex items-center justify-center bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200 dark:bg-red-700 dark:hover:bg-red-600"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Signup' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
