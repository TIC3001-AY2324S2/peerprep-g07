import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MonacoEditor from 'react-monaco-editor';

const socket = io('http://localhost:4001');

const CodeEditor = () => {
  const [code, setCode] = useState('');
  // const [username, setUsername] = useState('Nancy');
  const [roomID, setRoomID] = useState(0);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const handleCodeChange = (newCode, e) => {
    console.log("codechange");
    setCode(newCode);
    socket.emit('CODE_CHANGED', newCode);
  };

  const handleConnection = (roomID) => {
    socket.emit('CONNECTED_TO_ROOM', { roomID });
    console.log('CONNECTED_TO_ROOM', { roomID });
  };

  const handleCreateRoom = async () => {
    try {
      //const response = await axios.post('http://localhost:4001/create-room-with-user', { username });
      //const roomId = response.data.roomId;
      //await handleConnection(username);
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
        <input
          type="hidden"
          id="matched-roomID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)} // Update username state on change
        />
      </div>
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