import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import QuizSettings from "./QuizSettings";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function GeminiQuiz({ subject, subjectDescription }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const generateQuiz = async (questions, difficulty) => {
    setLoading(true);
    const prompt = `Generate a JSON object for a multiple-choice quiz about ${subject}.
    Subject description: ${subjectDescription}
    Number of questions: ${questions}
    Difficulty: ${difficulty}
   
    The JSON should have this structure with only 4 options not more than that nor less:
    {
      "questions": [
        {
          "question": "Question text here",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "Index of correct answer (0-3)"
        }
      ]
    }`;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const jsonString = response.text().match(/\{[\s\S]*\}/)[0];
      const quizData = JSON.parse(jsonString);
      console.log(quizData);

      // Navigate to the quiz page with the generated data
      navigate("/quiz", {
        state: {
          quizData,
          subject,
          subjectDescription,
          questions,
          difficulty,
        },
      });
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <QuizSettings onStartQuiz={generateQuiz} />;
}

export default GeminiQuiz;
