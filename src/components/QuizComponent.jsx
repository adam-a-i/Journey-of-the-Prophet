import React, { useState } from 'react';
import './QuizComponent.css';

const QuizComponent = ({ inputText, difficulty, numberOfQs }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const fetchQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching quiz with params:', { inputText, difficulty, numberOfQs });
      const response = await fetch('http://localhost:3000/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText, difficulty, numberOfQs }),
      });
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
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return <div className="quiz-loading">Loading quiz...</div>;
  }

  if (error) {
    return <div className="quiz-error">{error}</div>;
  }

  if (!quiz) {
    return (
      <button onClick={fetchQuiz} className="resource-btn quiz-btn">
        <span className="icon">✍️</span>
        <span className="btn-text">
          <strong>Take the Quiz</strong>
          <small>Test your knowledge</small>
        </span>
      </button>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-results">
        <h2>Quiz Results</h2>
        <div className="score">
          Score: {userAnswers.filter(a => a.isCorrect).length}/{quiz.length}
        </div>
        {userAnswers.map((answer, index) => (
          <div key={index} className="result-item">
            <p className="question">{answer.question.question}</p>
            <p className={`answer ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
              Your answer: {answer.userAnswer}
            </p>
            <p className="correct-answer">
              Correct answer: {answer.question.correct_answer}
            </p>
            <p className="explanation">{answer.question.explanation}</p>
          </div>
        ))}
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