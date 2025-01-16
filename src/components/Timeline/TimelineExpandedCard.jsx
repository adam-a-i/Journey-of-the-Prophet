import { motion } from "framer-motion";

const TimelineExpandedCard = ({ event, onClose }) => {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-sections">
          <section className="modal-header">
            <h2>{typeof event.title === 'object' ? event.title.en : event.title}</h2>
            <span className="event-year">{event.year}</span>
          </section>

          <section className="content-section">
            <h3>Summary</h3>
            <p className="detailed-content">
              {event.details.content}
            </p>
          </section>

          <section className="resources-section">
            <h3>Learning Resources</h3>
            <div className="resources-grid">
              <button className="resource-btn ppt-btn">
                <span className="icon">📊</span>
                <span className="btn-text">
                  <strong>PowerPoint Presentation</strong>
                  <small>Download and learn offline</small>
                </span>
              </button>

              <button className="resource-btn quiz-btn">
                <span className="icon">✍️</span>
                <span className="btn-text">
                  <strong>Take the Quiz</strong>
                  <small>Test your knowledge</small>
                </span>
              </button>
            </div>
          </section>

          <section className="video-section">
            <h3>Related Video</h3>
            <div className="video-container">
              <iframe
                src={event.details.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                title="Event Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {event.details.quotes && event.details.quotes.length > 0 && (
            <section className="quotes-section">
              <h3>Notable Quotes</h3>
              <div className="quotes-container">
                {event.details.quotes.map((quote, index) => (
                  <blockquote key={index}>{quote}</blockquote>
                ))}
              </div>
            </section>
          )}

          {event.details.references && event.details.references.length > 0 && (
            <section className="references-section">
              <h3>References</h3>
              <ul className="references-list">
                {event.details.references.map((ref, index) => (
                  <li key={index}>{ref}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineExpandedCard; 