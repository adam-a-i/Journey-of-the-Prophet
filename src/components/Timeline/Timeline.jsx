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

  return (
    <motion.div
      className="timeline-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="timeline-controls">
        <TimelineSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TimelineFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={timelineCategories}
        />
      </div>

      <div className="timeline-wrapper" ref={timelineRef}>
        <div className="timeline-line" />
        <AnimatePresence initial={false}>
          {filteredEvents.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              index={index}
              isActive={selectedEvent?.id === event.id}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="timeline-detail-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2>{selectedEvent.title}</h2>
            <div className="event-content">
              <p>{selectedEvent.details.content}</p>
              <div className="event-quotes">
                {selectedEvent.details.quotes.map((quote, index) => (
                  <blockquote key={index}>{quote}</blockquote>
                ))}
              </div>
              <div className="event-references">
                <h4>References:</h4>
                <ul>
                  {selectedEvent.details.references.map((ref, index) => (
                    <li key={index}>{ref}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Timeline;
