import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";

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
    return <QuizResults quizData={quizData} userAnswers={userAnswers} />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">{subject} Quiz</h1>
      <p className="mb-4">{subjectDescription}</p>
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
    </div>
  );
}

export default Quiz;
