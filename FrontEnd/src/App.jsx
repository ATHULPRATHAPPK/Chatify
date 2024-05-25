import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./pages/Chat";
import LoginPage from "./Components/LoginPage";
import Homepage from "./pages/Homepage";
import TestPage from "./Components/Chatpage/testPage";



function App() {
  return (
    <>
      {/* <div>App</div> */}

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/userLogin' element={<LoginPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/test' element={<TestPage/>} />
      </Routes>
    </>
  );
}

export default App;
