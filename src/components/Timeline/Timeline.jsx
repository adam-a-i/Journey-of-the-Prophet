import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineEvents, timelineCategories } from "../../data/timelineEvents";
import TimelineEvent from "./TimelineEvent";
import TimelineFilter from "./TimelineFilter";
import TimelineSearch from "./TimelineSearch";
import "./Timeline.css";

const Timeline = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const timelineRef = useRef(null);

  const filteredEvents = timelineEvents.filter((event) => {
    const matchesCategory =
      activeCategory === "all" || event.category === activeCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <motion.div
      className="timeline-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="timeline-controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <TimelineSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TimelineFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={timelineCategories}
        />
      </motion.div>

      <div className="timeline-wrapper" ref={timelineRef}>
        <div className="timeline-line" />
        <AnimatePresence mode="wait">
          {filteredEvents.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              index={index}
              isActive={selectedEvent?.id === event.id}
              onClick={() => handleEventClick(event)}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {selectedEvent && (
          <motion.div
            className="timeline-detail-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {selectedEvent.title}
            </motion.h2>
            <motion.div
              className="event-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p>{selectedEvent.details.content}</p>
              <div className="event-quotes">
                {selectedEvent.details.quotes.map((quote, index) => (
                  <motion.blockquote
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {quote}
                  </motion.blockquote>
                ))}
              </div>
              <motion.div
                className="event-references"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h4>References:</h4>
                <ul>
                  {selectedEvent.details.references.map((ref, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {ref}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Timeline;
