<<<<<<< HEAD
import { useState } from "react";
import "./App.css";
import CustomCursor from "./components/CustomCursor";
import Timeline from "./components/Timeline/Timeline";

function App() {
  return (
    <>
      <CustomCursor />
      <div className="app-container">
        <header className="main-header">
          <h1>The Prophet's Seerah</h1>
          <p className="subtitle">
            Journey Through the Life of Prophet Muhammad ﷺ
          </p>
        </header>
        <Timeline />
      </div>
    </>
  );
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> fa9ffc83499564cfa8c6b49f5727b9374500921f
