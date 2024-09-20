import React, { useEffect, useRef } from "react";
import { doc, setDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase-config"; // Adjust path to your config file
import { useNavigate } from "react-router-dom";

export default function QuizResults({ quizData, userAnswers, subject }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const correctAnswers = quizData.questions.filter(
    (q, i) => parseInt(q.correctAnswer) === userAnswers[i]
  ).length;

  const navigate = useNavigate();

  const saveAttemptedRef = useRef(false);

  useEffect(() => {
    const saveQuizResults = async () => {
      if (user && !saveAttemptedRef.current) {
        saveAttemptedRef.current = true;
        console.log("Attempting to save quiz results");
        const quizResults = {
          subject,
          numberOfQuestions: quizData.questions.length,
          totalCorrectAnswers: correctAnswers,
          questions: quizData.questions.map((question, index) => ({
            question: question.question,
            options: question.options,
            correctAnswer: parseInt(question.correctAnswer),
            selectedAnswer: parseInt(localStorage.getItem(`question_${index}`)),
          })),
        };

        try {
          const quizRef = collection(doc(db, "Users", user.uid), "quizzes");
          await setDoc(doc(quizRef), quizResults);
          console.log("Quiz results saved to Firestore!");

          // Clear local storage after saving
          quizData.questions.forEach((_, index) => {
            localStorage.removeItem(`question_${index}`);
          });
          console.log("Local storage cleared");
        } catch (error) {
          console.error("Error saving quiz results: ", error);
          saveAttemptedRef.current = false; // Reset if save fails
        }
      }
    };

    saveQuizResults();
  }, [quizData.questions, user, subject, correctAnswers]);

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full">
      <div className="w-[1080px] mx-auto mt-8 p-4 bg-white ">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <button onClick={handleClose} className="border py-3 px-5 rounded-lg">
            Dashboard
          </button>
        </div>
        <p className="text-lg mb-4">
          You got {correctAnswers} out of {quizData.questions.length} questions
          correct.
        </p>
        <div className="space-y-4">
          {quizData.questions.map((question, index) => {
            const selectedOption = localStorage.getItem(`question_${index}`);
            const isSelected = selectedOption !== null;

            return (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold">{question.question}</p>

                <div className="grid grid-cols-2 gap-5">
                  {question.options.map((option, optionIndex) => {
                    const isSelectedOption = selectedOption == optionIndex;
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
                              stroke={
                                isCorrectOption ? "green" : "currentColor"
                              }
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
