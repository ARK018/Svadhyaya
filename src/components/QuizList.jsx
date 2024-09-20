import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config"; // Adjust the path to your firebase config
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function QuizList({ subject }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          // Reference to the quizzes sub-collection
          const quizzesRef = collection(db, "Users", user.uid, "quizzes");

          // Query quizzes for the specified subject
          const q = query(quizzesRef, where("subject", "==", subject));

          // Fetch quizzes
          const querySnapshot = await getDocs(q);
          const fetchedQuizzes = querySnapshot.docs.map((doc) => doc.data());

          // Set fetched quizzes in state
          setQuizzes(fetchedQuizzes);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching quizzes: ", error);
          setLoading(false);
        }
      }
    };

    fetchQuizzes();
  }, [subject]);

  if (loading) {
    return <p>Loading quizzes...</p>;
  }

  if (quizzes.length === 0) {
    return <p>No quizzes found for {subject}.</p>;
  }

  const handleQuizClick = (quiz, index) => {
    navigate("/result", { state: { quizData: quiz, quizIndex: index + 1 } }); // Navigate to result page with quiz data
  };

  return (
    <div>
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className="bg-[#F7F7F7] p-5 rounded-lg flex items-center justify-between mb-4"
          onClick={() => handleQuizClick(quiz, index)}
        >
          <div>
            <h3 className="font-medium">Quiz {index + 1}</h3>
            <p className="text-base font-medium text-black opacity-50">
              {quiz.numberOfQuestions} Questions · {quiz.totalCorrectAnswers}{" "}
              Correct Answers
            </p>
          </div>
          <div className="w-12 h-12">
            <CircularProgressbar
              styles={{
                path: {
                  stroke: `rgb(25, 144, 66)`, // Green for correct answers
                },
                text: {
                  fill: "#199042",
                  fontSize: "32px",
                  fontWeight: 600,
                },
              }}
              strokeWidth={12}
              value={(quiz.totalCorrectAnswers / quiz.numberOfQuestions) * 100} // Progress in percentage
              text={`${Math.round(
                (quiz.totalCorrectAnswers / quiz.numberOfQuestions) * 100
              )}`} // Show percentage score
            />
          </div>
        </div>
      ))}
    </div>
  );
}
