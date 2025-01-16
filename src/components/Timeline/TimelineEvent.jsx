import { motion } from "framer-motion";

const TimelineEvent = ({ event, index, isActive, onClick }) => {
  // Add console log to check if click handler is being called
  const handleClick = () => {
    console.log('TimelineEvent clicked:', event.id);
    onClick(event);
  };

  // Handle both string and object title/description
  const title = typeof event.title === 'object' ? event.title.en : event.title;
  const description = typeof event.description === 'object' ? event.description.en : event.description;

  return (
    <motion.div
      className={`timeline-event ${isActive ? "active" : ""}`}
      data-index={index}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="event-icon">{event.icon}</div>
      <div className="event-content">
        <span className="event-year">{event.year}</span>
        <h3 className="event-title">{title}</h3>
        <p className="event-description">{description}</p>
      </div>
    </motion.div>
  );
};

export default TimelineEvent;
