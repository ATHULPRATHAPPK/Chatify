import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const serverUrl = "http://localhost:9000";
const socket = io(serverUrl, { transports: ['websocket'] });

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");

  useEffect(() => {
    console.log("Connecting to socket...");
    socket.on("connect", () => {
      console.log("Connected to socket", socket.id);
    });

    socket.on("message", (message) => {
      console.log("Message received from server:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Clean up socket connection when component unmounts
    return () => {
      console.log("Disconnecting from socket...");
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && recipientId.trim() !== "") {
      console.log("Sending message:", newMessage, "to recipient:", recipientId);
      socket.emit("message", { content: newMessage, recipientId });
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
        <input
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="mt-2 px-4 py-2 rounded-lg border-2 border-gray-300 p-2"
          placeholder="Recipient ID"
        />
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
