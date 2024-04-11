import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';

const socket = io('http://localhost:4001');

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('Nancy');
  const [connectedUsers, setConnectedUsers] = useState([]);

  const handleCodeChange = (newCode, e) => {
    console.log("codechange");
    setCode(newCode);
    socket.emit('CODE_CHANGED', newCode);
  };

  const handleConnection = (username) => {
    socket.emit('CONNECTED_TO_ROOM', { username });
    console.log(username);
  };

  const handleCreateRoom = async () => {
    try {
      //const response = await axios.post('http://localhost:4001/create-room-with-user', { username });
      //const roomId = response.data.roomId;
      await handleConnection(username); // Pass only username
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  useEffect(() => {
    // Socket.IO event listeners
    socket.on('ROOM:CONNECTION', (users) => {
      //const usernames = users.map(user => user.username);
      setConnectedUsers(users);
    });

    socket.on('CODE_UPDATED', (updatedCode) => {
      console.log('UPDATE CODE');
      setCode(updatedCode);
    });
    // Clean up socket connections on unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <div>
      <h1>Live Code Editor</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state on change
        />
      </div>
      <div>
      <h3>Connected Users:</h3>
      <ul>
        {connectedUsers.map((user, socketId) => (
          <li key={socketId}>{user.username}</li>
        ))}
      </ul>
    </div>
      <button onClick={handleCreateRoom}>Start Room</button>
      <MonacoEditor
        value={code}
        language="javascript"
        theme="vs-dark"
        height="500px"
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default CodeEditor;