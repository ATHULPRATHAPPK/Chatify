import React from 'react';

function UserList({ users, selectedUser, setSelectedUser }) {
  return (
    <div className="w-1/3 bg-gray-800 p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Chats</h2>
      <input 
        type="text" 
        placeholder="Search" 
        className="p-2 mb-4 rounded-lg bg-gray-700 border-none text-white"
      />
      <h3 className="text-md font-semibold mb-2">Other Users</h3>
      <ul className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <li
            key={user.id}
            className={`p-2 cursor-pointer rounded-lg mb-2 ${selectedUser.id === user.id ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-400`}
            onClick={() => setSelectedUser(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
