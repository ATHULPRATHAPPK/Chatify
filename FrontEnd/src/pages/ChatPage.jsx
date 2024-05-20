// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your backend URL

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Emit the new message to the server
      socket.emit("message", { content: newMessage });

      // Clear the input field
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto bg-gray-200 p-4">
        {messages.map((message, index) => (
          <div key={index} className="my-2 p-2 rounded-lg bg-blue-500 text-white">
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <div className="p-4">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full h-16 resize-none rounded-lg border-2 border-gray-300 p-2"
          placeholder="Type your message..."
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
