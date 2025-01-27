import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizComponent from './QuizComponent';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { content, title, year } = location.state || {};

  if (!content) {
    return (
      <div className="quiz-error">
        <h2>Error: No content found</h2>
        <button onClick={() => navigate('/')}>Return to Timeline</button>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-page-header">
        <h1>{typeof title === 'object' ? title.en : title}</h1>
        <span className="year">{year}</span>
      </div>
      <QuizComponent 
        inputText={content} 
        difficulty="medium" 
        numberOfQs={5} 
      />
    </div>
  );
};

export default QuizPage; 