import { motion } from "framer-motion";

const TimelineEvent = ({ event, index, isActive, onClick }) => {
  return (
    <motion.div
      className={`timeline-event ${isActive ? "active" : ""}`}
      data-index={index}
      onClick={onClick}
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
      <motion.div
        className="event-icon"
        whileHover={{
          rotate: 180,
          transition: { duration: 0.3 },
        }}
      >
        {event.icon}
      </motion.div>
      <div className="event-content">
        <span className="event-year">{event.year}</span>
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>
      </div>
    </motion.div>
  );
};

export default TimelineEvent;
