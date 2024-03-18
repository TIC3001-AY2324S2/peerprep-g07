import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Editor from "@monaco-Editor/react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Editor
      height={"100vh"}
      width={"100vw"}
      theme="vs-dark"
      
      />
  )
}

export default App
