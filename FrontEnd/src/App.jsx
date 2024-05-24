import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./pages/Chat";
import LoginPage from "./Components/LoginPage";

function App() {
  return (
    <>
      {/* <div>App</div> */}

      <Routes>
        <Route path='/userLogin' element={<LoginPage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
