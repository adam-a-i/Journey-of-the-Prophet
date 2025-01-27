import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timeline from './components/Timeline/Timeline';
import QuizPage from './components/QuizPage';
import TimelineExpandedCard from './components/Timeline/TimelineExpandedCard';
import { AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handlePrevious = () => {
    const currentIndex = timelineEvents.findIndex(e => e.id === selectedEvent.id);
    if (currentIndex > 0) {
      setSelectedEvent(timelineEvents[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = timelineEvents.findIndex(e => e.id === selectedEvent.id);
    if (currentIndex < timelineEvents.length - 1) {
      setSelectedEvent(timelineEvents[currentIndex + 1]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
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
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}
            </AnimatePresence>
          </div>
        } />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;