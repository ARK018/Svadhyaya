import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData, subject, subjectDescription } = location.state || {};
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData?.questions.length).fill(null)
  );
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    if (!quizData) {
      navigate("/dashboard");
    }
  }, [quizData, navigate]);

  const handleAnswer = (questionIndex, answerIndex) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    setQuizComplete(true);
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  if (quizComplete) {
    return (
      <QuizResult
        quizData={quizData}
        userAnswers={userAnswers}
        subject={subject}
      />
    );
  }

  return (
    <QuizQuestion
      question={quizData.questions[currentQuestion]}
      onAnswer={handleAnswer}
      currentQuestion={currentQuestion}
      totalQuestions={quizData.questions.length}
      onNextQuestion={handleNextQuestion}
      onPreviousQuestion={handlePreviousQuestion}
      selectedAnswer={userAnswers[currentQuestion]}
      onFinish={handleFinish}
    />
  );
}

export default Quiz;
