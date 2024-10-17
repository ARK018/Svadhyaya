import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // This runs whenever the route changes (i.e., location changes)
    const clearCacheAndLocalStorage = () => {
      // Clear localStorage
      localStorage.clear();

      // Clear browser cache if supported
      if ("caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }

      console.log("Cache and localStorage cleared on route change");
    };

    clearCacheAndLocalStorage(); // Clear immediately when component loads
  }, [location]); // Runs the effect whenever location (i.e., URL) changes

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

  useEffect(() => {
    // Load selected option from local storage when component mounts
    const storedAnswer = localStorage.getItem(`question_${currentQuestion}`);
    if (storedAnswer !== null) {
      setSelectedOption(parseInt(storedAnswer, 10));
    }
  }, [currentQuestion]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    onAnswer(currentQuestion, index);
    // Save the selected option to local storage
    localStorage.setItem(`question_${currentQuestion}`, index);
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

  const handleClose = () => {
    localStorage.clear(); // Clear localStorage on button click
    navigate("/dashboard"); // Navigate to the dashboard
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full h-[100vh]">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">
            {`Question ${currentQuestion + 1} of ${totalQuestions}`}
          </span>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
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
      <div className="flex flex-col items-center justify-center h-[calc(100vh-84.4px)]">
        <div className="w-[760px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {question.question}
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full flex items-center justify-center h-14 text-left bg-[#f7f7f7] p-4 rounded-lg border ${
                  selectedOption === index
                    ? "border-black text-black"
                    : "hover:border-black"
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 flex-shrink-0"
                >
                  {selectedOption === index ? (
                    <circle
                      cx="8"
                      cy="8"
                      r="5.5"
                      stroke="currentColor"
                      strokeWidth="5"
                    />
                  ) : (
                    <circle
                      cx="8"
                      cy="8"
                      r="6.5"
                      stroke="currentColor"
                      strokeOpacity="0.2"
                      strokeWidth="3"
                    />
                  )}
                </svg>
                <span className="text-[17px] leading-6 flex-grow">
                  {option}
                </span>
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
