import { useState, useEffect } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import { useNavigate } from "react-router-dom";
const socket = io.connect('http://localhost:3001');

 const currentUsername = localStorage.getItem('username');


function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [mockUsers, setMockUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.post('http://localhost:3001/api/users/listUsers',{currentUsername})
      .then(response => {
        setMockUsers(response.data);
        if (response.data.length > 0) {
          const initialUser = response.data[0];
          setSelectedUser(initialUser);
          const roomId = generateRoomId(currentUsername, initialUser.username);
          socket.emit('join_room', roomId);
          fetchMessages(currentUsername, initialUser.username);
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

  const fetchMessages = (currentUser, recipientUser) => {
    console.log(recipientUser);
    axios.post('http://localhost:3001/api/users/getMessages',
  { currentUser, recipientUser },
  { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
)
      .then(response => {
        setMessages(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser?.username?.trim()) {
      const roomId = generateRoomId(currentUsername, selectedUser.username);
      const messageData = { roomId, content: newMessage, sender_id: currentUsername,recipient_id:selectedUser.username };
      console.log(messageData);
      socket.emit('send_message', messageData);
      setNewMessage("");
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    const roomId = generateRoomId(currentUsername, user.username);
    socket.emit('join_room', roomId);
    fetchMessages(currentUsername, user.username);
  };

  const generateRoomId = (user1, user2) => {
    const sortedUsers = [user1, user2].sort();
    return `${sortedUsers[0]}$${sortedUsers[1]}`;
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Redirect to login page
    navigate('/userlogin');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <UserList users={mockUsers} currentUser={currentUsername} selectedUser={selectedUser} setSelectedUser={handleUserSelect} logOut={handleLogout} />
      <ChatWindow 
        messages={messages} 
        newMessage={newMessage} 
        setNewMessage={setNewMessage} 
        handleSendMessage={handleSendMessage}
        selectedUser={selectedUser}
        currentUsername={currentUsername}
      />
    </div>
  );
}

export default ChatPage;
