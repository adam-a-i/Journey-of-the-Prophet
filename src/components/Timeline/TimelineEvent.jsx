import { motion } from "framer-motion";

const TimelineEvent = ({ event, index, isActive, onClick }) => {
  return (
    <motion.div
      className={`timeline-event ${isActive ? "active" : ""}`}
      data-index={index}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="event-icon"
        whileHover={{
          rotate: 360,
          transition: { duration: 0.5 },
        }}
      >
        {event.icon}
      </motion.div>
      <motion.div className="event-content">
        <motion.span
          className="event-year"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {event.year}
        </motion.span>
        <motion.h3
          className="event-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {event.title}
        </motion.h3>
        <motion.p
          className="event-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {event.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default TimelineEvent;
