import { useState } from "react";
import "./App.css";
import Timeline from "./components/Timeline/Timeline";
import { AnimatePresence } from "framer-motion";
import TimelineExpandedCard from "./components/Timeline/TimelineExpandedCard.jsx";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventSelect = (event) => {
    console.log('Setting selected event:', event);
    setSelectedEvent(event);
  };

  return (
    <div className="root-container">
      <div className="app-container">
        <header className="main-header">
          <h1>The Prophet's Seerah</h1>
          <p className="subtitle">
            Journey Through the Life of Prophet Muhammad ﷺ
          </p>
        </header>
        <Timeline onEventSelect={handleEventSelect} selectedEvent={selectedEvent} />
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <TimelineExpandedCard 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
