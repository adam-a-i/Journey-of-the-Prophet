import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineEvents, timelineCategories } from "../../data/timelineEvents";
import TimelineEvent from "./TimelineEvent";
import TimelineFilter from "./TimelineFilter";
import TimelineSearch from "./TimelineSearch";
import "./Timeline.css";

const Timeline = ({ onEventSelect, selectedEvent }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const timelineRef = useRef(null);

  const filteredEvents = timelineEvents.filter((event) => {
    const matchesCategory =
      activeCategory === "all" || event.category === activeCategory;
    
    // Handle both string and object title/description
    const title = typeof event.title === 'object' ? event.title.en : event.title;
    const description = typeof event.description === 'object' ? event.description.en : event.description;
    
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
              onClick={() => onEventSelect(event)}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Timeline;
