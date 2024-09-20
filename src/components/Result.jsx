import React from "react";
import { useLocation } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const { quizData } = location.state; // Get quiz data from state

  const correctAnswers = quizData.questions.filter(
    (q, i) => parseInt(q.correctAnswer) === quizData.questions[i].selectedAnswer
  ).length;

  return (
    <div className="w-full mx-auto">
      <div className="w-full  mt-8 p-4 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
        <p className="text-lg mb-4">
          You got {correctAnswers} out of {quizData.numberOfQuestions} questions
          correct.
        </p>
        <div className="space-y-4">
          {quizData.questions.map((question, index) => (
            <div key={index} className="border-b pb-4">
              <p className="font-semibold">{question.question}</p>

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
                          ? "border-red-500 bg-red-500/10"
                          : isCorrectOption
                          ? "border-green-500 bg-green/10"
                          : "hover:border-black"
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
