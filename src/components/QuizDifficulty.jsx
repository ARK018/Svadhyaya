import React from "react";
import { useState } from "react";

export function QuizDifficulty() {
  const [difficulty, setdifficulty] = useState("Medium");
  return (
    <div className="min-h-full">
      <select
        id="difficulty"
        onChange={(e) => setdifficulty(e.target.value)}
        className="w-full py-2 border-none border-gray-300 focus:outline-none bg-white"
        required
        defaultValue=""
      >
        <option value="" disabled>
          Difficulty
        </option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  );
}
