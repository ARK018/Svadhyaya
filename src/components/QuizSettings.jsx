import React, { useState } from "react";

function QuizSettings({ onStartQuiz }) {
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState("");
  const [time, setTime] = useState("");

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleQuestionsChange = (e) => {
    const selectedQuestions = e.target.value;
    setQuestions(selectedQuestions);

    // Set time based on selected number of questions
    let timeLimit = "";
    switch (selectedQuestions) {
      case "05":
        timeLimit = "05 minutes";
        break;
      case "10":
        timeLimit = "10 minutes";
        break;
      case "20":
        timeLimit = "20 minutes";
        break;
      default:
        timeLimit = "";
    }
    setTime(timeLimit);
  };

  const handleStartQuiz = () => {
    if (questions && difficulty) {
      if (typeof onStartQuiz === "function") {
        onStartQuiz(questions, difficulty);
      } else {
        console.error("onStartQuiz is not a function");
        alert("Unable to start quiz. Please try again later.");
      }
    } else {
      alert("Please select both the number of questions and difficulty.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-custom-combined flex items-center justify-between">
      <div className="w-full flex justify-between items-center">
        <div className="">
          <h3 className="font-semibold">Quiz</h3>
          <div className="flex justify-between gap-12">
            <div className="flex gap-12">
              <div>
                <select
                  id="difficulty"
                  onChange={handleDifficultyChange}
                  className="w-full py-2 border-none border-gray-300 focus:outline-none bg-white cursor-pointer"
                  value={difficulty}
                >
                  <option value="" disabled>
                    Select Difficulty
                  </option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <select
                  id="questions"
                  onChange={handleQuestionsChange}
                  className="w-full py-2 border-none border-gray-300 focus:outline-none bg-white cursor-pointer"
                  value={questions}
                >
                  <option value="" disabled>
                    No. of Questions
                  </option>
                  <option value="05">05 Questions</option>
                  <option value="10">10 Questions</option>
                  <option value="20">20 Questions</option>
                  {/* Add more options if needed */}
                </select>
              </div>
              {questions && <p className="mt-2 text-gray-700">Time: {time}</p>}
            </div>
          </div>
        </div>
        <button
          onClick={handleStartQuiz}
          className="text-xs font-semibold tracking-wider w-fit h-8 px-4 py-2 bg-black text-white rounded-full"
        >
          START TEST
        </button>
      </div>
    </div>
  );
}

export default QuizSettings;
