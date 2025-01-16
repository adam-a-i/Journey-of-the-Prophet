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
