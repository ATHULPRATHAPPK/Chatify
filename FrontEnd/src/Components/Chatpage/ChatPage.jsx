import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import UserList from './UserList';
import ChatWindow from './ChatWindow';

const socket = io.connect('http://localhost:3001');

const mockUsers = [
  { id: 'User1', name: 'Robin Sparkles' },
  { id: 'User2', name: 'Cook Pu' },
  { id: 'User3', name: 'Princess Consuela' },
  { id: 'User4', name: 'Bamito Supreme' },
  { id: 'User5', name: 'The Commodore' },
  { id: 'User6', name: 'Lorenzo von Matterhorn' },
];

const mockMessages = {
  'User1': [
    { content: "Hello!", senderId: "User1" },
    { content: "Hi there!", senderId: "You" },
  ],
  'User2': [
    { content: "What's up?", senderId: "User2" },
    { content: "Not much, you?", senderId: "You" },
  ],
  'User3': [
    { content: "Long time no see!", senderId: "User3" },
    { content: "Yeah, it's been a while!", senderId: "You" },
  ],
  'User4': [
    { content: "How's it going?", senderId: "User4" },
    { content: "Pretty good, you?", senderId: "You" },
  ],
  'User5': [
    { content: "Hey!", senderId: "User5" },
    { content: "Hey!", senderId: "You" },
  ],
  'User6': [
    { content: "Hello there!", senderId: "User6" },
    { content: "General Kenobi!", senderId: "You" },
  ]
};

function ChatPage() {
  const [messages, setMessages] = useState(mockMessages['User1']);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser.id.trim()) {
      socket.emit('send_message', { recipientId: selectedUser.id, content: newMessage });
      setMessages((prevMessages) => [...prevMessages, { content: newMessage, senderId: 'You' }]);
      setNewMessage("");
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages(mockMessages[user.id]);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <UserList users={mockUsers} selectedUser={selectedUser} setSelectedUser={handleUserSelect} />
      <ChatWindow 
        messages={messages} 
        newMessage={newMessage} 
        setNewMessage={setNewMessage} 
        handleSendMessage={handleSendMessage}
        selectedUser={selectedUser}
      />
    </div>
  );
}

export default ChatPage;
