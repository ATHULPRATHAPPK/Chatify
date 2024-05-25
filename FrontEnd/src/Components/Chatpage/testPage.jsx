import React, { useState, useEffect } from "react";
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function testPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    axios.post('http://localhost:3001/api/users/listUsers')
      .then(response => {
        setUsers(response.data);
        // Print user data in the console
        console.log("User Data:", response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Socket event handling remains the same
    socket.on('receive_message', (message) => {
      // Handle received messages if needed
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <div>
      <p>This is a test page.</p>
    </div>
  );
}

export default testPage;
