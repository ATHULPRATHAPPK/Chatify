/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// UserList.jsx
import React from 'react';

function UserList({ users,currentUser, selectedUser,  setSelectedUser,logOut }) {
  return (
    <div className="w-1/3 bg-gray-800 p-4 flex flex-col ">
      <h2 className="text-lg font-bold mb-4">Chats</h2>

      <h2 className='mb-3  self-end me-3'>{` ${currentUser}`}</h2>
      <input 
        type="text" 
        placeholder="Search" 
        className="p-2 mb-4 rounded-lg bg-gray-700 border-none text-white"
      />
      <h3 className="text-md font-semibold mb-2">Other Users</h3>
      <ul className="flex-1 overflow-y-auto">
        {users && users.map((user) => (
          <li
            key={user.username}
            className={`p-2 cursor-pointer rounded-lg mb-2 ${selectedUser?.username === user.username ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-400`}
            onClick={() => setSelectedUser(user)}
          >
            {user.username}
          </li>
        ))}
      </ul>
      <button onClick={logOut} className="bg-red-500 hover:bg-red-600 max-w-20 text-white font-bold py-2 px-3 rounded"> Logout</button>

    </div>
  );
}

export default UserList;
