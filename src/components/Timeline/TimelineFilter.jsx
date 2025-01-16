import { motion } from "framer-motion";

const TimelineFilter = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <motion.div
      className="timeline-filter"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
        onClick={() => setActiveCategory("all")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        All Events
      </motion.button>
      {Object.entries(categories).map(([key, value], index) => (
        <motion.button
          key={key}
          className={`filter-btn ${activeCategory === value ? "active" : ""}`}
          onClick={() => setActiveCategory(value)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {value}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default TimelineFilter;
