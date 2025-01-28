import React, { useState, useEffect } from 'react';
import './QuizComponent.css';
import { API_URL } from '../config';

const QuizComponent = ({ inputText, difficulty, numberOfQs }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching quiz with params:', { inputText, difficulty, numberOfQs });
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText, difficulty, numberOfQs }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Quiz data received:', data);
      if (data.quiz && data.quiz.quiz) {
        setQuiz(data.quiz.quiz);
        console.log('Generated questions:', data.quiz.quiz);
      } else {
        setError('Invalid quiz format received');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setCurrentAnswer({
      selected: answer,
      isCorrect: answer === quiz[currentQuestion].correct_answer
    });
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    
    const currentQ = quiz[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct_answer;
    
    setUserAnswers([...userAnswers, {
      question: currentQ,
      userAnswer: selectedAnswer,
      isCorrect
    }]);
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const currentQ = quiz[currentQuestion];
    setUserAnswers([...userAnswers, {
      question: currentQ.question,
      userAnswer: currentAnswer.selected,
      correctAnswer: currentQ.correct_answer,
      isCorrect: currentAnswer.isCorrect,
      explanation: currentQ.explanation,
      options: currentQ.options
    }]);

    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentAnswer(null);
    
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading-state">
          <div className="loader"></div>
          <p>Generating your quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchQuiz}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="quiz-container">
        <div className="loading-state">
          <div className="loader"></div>
          <p>Preparing questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = quiz.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="quiz-container quiz-results">
        <h2>Quiz Results</h2>
        <div className="score">
          <div className="score-text">
            Score: {correctAnswers}/{totalQuestions} ({percentage}%)
          </div>
        </div>

        <div className="results-list">
          {userAnswers.map((answer, index) => (
            <div key={index} className="result-item">
              <h3>Question {index + 1}</h3>
              <p className="question-text">{answer.question}</p>
              
              <div className="answers-grid">
                {answer.options.map((option, optIndex) => (
                  <div 
                    key={optIndex} 
                    className={`answer-option ${
                      option === answer.userAnswer 
                        ? answer.isCorrect 
                          ? 'correct' 
                          : 'incorrect'
                        : option === answer.correctAnswer
                          ? 'correct'
                          : ''
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>

              <div className="answer-details">
                <p className="your-answer">
                  Your answer: <span className={answer.isCorrect ? 'correct' : 'incorrect'}>
                    {answer.userAnswer}
                  </span>
                </p>
                {!answer.isCorrect && (
                  <p className="correct-answer">
                    Correct answer: <span className="correct">{answer.correctAnswer}</span>
                  </p>
                )}
                <div className="explanation">
                  <strong>Explanation:</strong> {answer.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-results-buttons">
          <button 
            className="back-button"
            onClick={() => window.location.href = '/'}
          >
            Back to Timeline
          </button>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="question-counter">
          {currentQuestion + 1}/{quiz.length}
        </div>
      </div>

      <div className="question-section">
        <h3>{quiz[currentQuestion].question}</h3>
        <div className="options">
          {quiz[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`option ${
                selectedAnswer === option 
                  ? currentAnswer
                    ? currentAnswer.isCorrect 
                      ? 'correct'
                      : 'incorrect'
                    : 'selected'
                  : ''
              }`}
              disabled={currentAnswer !== null}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {currentAnswer && (
        <div className="explanation-section">
          <div className={`result-banner ${currentAnswer.isCorrect ? 'correct' : 'incorrect'}`}>
            {currentAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
          </div>
          <p className="explanation">{quiz[currentQuestion].explanation}</p>
          <button className="next-button" onClick={nextQuestion}>
            {currentQuestion === quiz.length - 1 ? 'Show Results' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent; 