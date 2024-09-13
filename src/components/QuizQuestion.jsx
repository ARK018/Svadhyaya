import React, { useState, useEffect } from "react";

export default function QuizQuestion({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions,
  onNextQuestion,
  onPreviousQuestion,
  selectedAnswer,
  onFinish,
}) {
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState(selectedAnswer);

  useEffect(() => {
    setSelectedOption(selectedAnswer);
  }, [selectedAnswer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 100 / (5 * 60); // 5 minutes in seconds
      });
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    onAnswer(currentQuestion, index);
  };

  const handleNextClick = () => {
    if (selectedOption !== null) {
      if (currentQuestion === totalQuestions - 1) {
        onFinish();
      } else {
        onNextQuestion();
      }
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">
              {`Question ${currentQuestion + 1} of ${totalQuestions}`}
            </span>
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>4:19</span>
            <div className="w-full mx-4 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span>15:00</span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {question.question}
          </h2>
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-lg border ${
                  selectedOption === index
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <button
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={onPreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Back
            </button>
            <button
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              onClick={handleNextClick}
            >
              {currentQuestion === totalQuestions - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
