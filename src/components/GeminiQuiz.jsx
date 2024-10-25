import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import QuizSettings from "./QuizSettings";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function GeminiQuiz({ subject, subjectDescription, subjectSyllabus }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const generateQuiz = async (questions, difficulty, time) => {
    setLoading(true);
    console.log("Time passed:", time);
    const prompt = `Generate a JSON object for a multiple-choice quiz about ${subject}.
    Subject description: ${subjectDescription}
    Subject syllabus: ${subjectSyllabus}
    Number of questions: ${questions}
    Difficulty level: ${difficulty} (use "Easy" for basic recall questions, "Medium" for questions that require understanding and application, and "Hard" for questions requiring analysis or problem-solving)
    
    The JSON should have this structure with exactly 4 options, each a maximum of 30 characters:
    {
      "questions": [
        {
          "question": "Question text here",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "Index of correct answer (0-3)"
        }
      ]
    }
    
    For "Easy" difficulty, focus on basic concepts choose randomly from the middle and end of the syllabus. 
    For "Medium" difficulty, include questions that require some understanding and application.
    For "Hard" difficulty, design questions that involve analysis, reasoning, or multi-step problem-solving.
    
    Ensure that question formats and content vary according to the specified difficulty.`;

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
          time,
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <QuizSettings onStartQuiz={generateQuiz} />;
}

export default GeminiQuiz;
