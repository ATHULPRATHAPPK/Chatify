// ChatPage.jsx
import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import UserList from './UserList';
import ChatWindow from './ChatWindow';

const socket = io.connect('http://localhost:3001');

const mockMessages = {
  'abhi4598': [
    { content: "Hello!", senderId: "User1" },
    { content: "Hi there!", senderId: "You" },
  ],
  'shibil0671': [
    { content: "What's up?", senderId: "User2" },
    { content: "Not much, you?", senderId: "You" },
  ],
  'athul5612': [
    { content: "Long time no see!", senderId: "User3" },
    { content: "Yeah, it's been a while!", senderId: "You" },
  ],
  'anwar9090': [
    { content: "How's it going?", senderId: "User4" },
    { content: "Pretty good, you?", senderId: "You" },
  ]
};

function ChatPage() {
  const [messages, setMessages] = useState(mockMessages['abhi4598']);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [mockUsers, setMockUsers] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:3001/api/users/listUsers')
      .then(response => {
        setMockUsers(response.data);
        if (response.data.length > 0) {
          setSelectedUser(response.data[0]);
          setMessages(mockMessages[response.data[0].username] || []);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser?.id?.trim()) {
      socket.emit('send_message', { recipientId: selectedUser.id, content: newMessage });
      setMessages((prevMessages) => [...prevMessages, { content: newMessage, senderId: 'You' }]);
      setNewMessage("");
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages(mockMessages[user.username]);
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
