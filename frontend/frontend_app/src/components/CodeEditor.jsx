import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MonacoEditor from 'react-monaco-editor';

const socket = io('http://localhost:4001');

const CodeEditor = (room) => {
  const [code, setCode] = useState('');
  // const [username, setUsername] = useState('Nancy');
  //const [roomID, setRoomID] = useState(initialRoomID);
  const [roomID, setRoomID] = useState(room);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const handleCodeChange = (newCode, e) => {
    console.log("codechange in roomID:", roomID);
    setCode(newCode);
    socket.emit('CODE_CHANGED', newCode);
  };

  const handleConnection = (roomID) => {
    socket.emit('CONNECTED_TO_ROOM', { roomID });
    console.log('CONNECTED_TO_ROOM', { roomID });
  };

  const handleCreateRoom = async () => {
    try {
      console.log("handleCreateRoom: ", roomID)
      await handleConnection(roomID); // Pass only username
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };


  useEffect(() => {
    // Socket.IO event listeners
    // socket.on('ROOM:CONNECTION', (users) => {
    //   //const usernames = users.map(user => user.username);
    //   setConnectedUsers(users);
    // });

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
      <div>
    </div>
      <button id="collaborate" style={{display: "none"}} onClick={handleCreateRoom}></button>
      <MonacoEditor
        value={code}
        language="javascript"
        theme="vs-dark"
        height="500px"
        onChange={handleCodeChange}
        options={{automaticLayout: true,}}
      />
    </div>
  );
};

export default CodeEditor;