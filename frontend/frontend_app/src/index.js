import React from 'react';
import App from './components/App';
import CodeEditor from './components/CodeEditor.jsx';
import ReactDOM from 'react-dom';


ReactDOM.render(
    <React.StrictMode>
      <CodeEditor/>
    </React.StrictMode>,
    document.getElementById('editor')
);
