import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import axios from 'axios'; // Import axios for making HTTP requests

const socket = io.connect('http://localhost:3001');

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Change initial value to null

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    axios.post('http://localhost:3001/api/users/listUsers')
      .then(response => {
        setUsers(response.data.users);

        // Select the first user by default
        if (response.data.users.length > 0) {
          setSelectedUser(response.data.users[0]);
          console.log(selectedUser);
          setMessages(mockMessages[response.data.users[0].id]); // Mock messages for the first user
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Socket event handling remains the same
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

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
      <UserList users={users} selectedUser={selectedUser} setSelectedUser={handleUserSelect} />
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
    