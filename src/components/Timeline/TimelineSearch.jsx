import { motion } from "framer-motion";

const TimelineSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <motion.div
      className="timeline-search"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default TimelineSearch;
