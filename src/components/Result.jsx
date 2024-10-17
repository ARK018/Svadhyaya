import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizData } = location.state; // Get quiz data from state

  const correctAnswers = quizData.questions.filter(
    (q, i) => parseInt(q.correctAnswer) === quizData.questions[i].selectedAnswer
  ).length;

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full ">
      <div className="w-[760px] mx-auto mt-8 p-4 bg-white ">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Quiz Results</h2>
          <button
            onClick={handleClose}
            className="border-2 rounded-lg px-4 py-2 "
          >
            Dashboard
          </button>
        </div>
        <p className="text-lg mb-4">
          You got {correctAnswers} out of {quizData.numberOfQuestions} questions
          correct.
        </p>
        <div className="space-y-6">
          {quizData.questions.map((question, index) => (
            <div key={index} className="flex flex-col gap-3 border-b pb-6">
              <p className="font-medium text-black/50 text-lg">
                {question.question}
              </p>

              <div className="grid grid-cols-2 gap-5">
                {question.options.map((option, optionIndex) => {
                  const isSelectedOption =
                    quizData.questions[index].selectedAnswer === optionIndex;
                  const isCorrectOption =
                    parseInt(question.correctAnswer) === optionIndex;

                  return (
                    <button
                      key={optionIndex}
                      className={`w-full flex items-center justify-center h-14 text-left bg-[#f7f7f7] p-4 rounded-lg border-[2.1px] ${
                        isSelectedOption && !isCorrectOption
                          ? "border-red-500/70 bg-red-500/10"
                          : isCorrectOption
                          ? "border-green-500/70 bg-green/10"
                          : "border-black/10"
                      }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 flex-shrink-0"
                      >
                        {isSelectedOption ? (
                          <circle
                            cx="8"
                            cy="8"
                            r="5.5"
                            stroke={isCorrectOption ? "green" : "red"}
                            strokeWidth="5"
                          />
                        ) : (
                          <circle
                            cx="8"
                            cy="8"
                            r="5.5"
                            stroke={isCorrectOption ? "green" : "currentColor"}
                            strokeOpacity={isCorrectOption ? "1" : "0.2"}
                            strokeWidth={isCorrectOption ? "5" : "3"}
                          />
                        )}
                      </svg>
                      <span className="text-[17px] leading-6 flex-grow">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
