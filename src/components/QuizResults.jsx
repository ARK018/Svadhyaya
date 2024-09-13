import Navbar from "./navbar";

export default function QuizResults({ quizData, userAnswers }) {
  const correctAnswers = quizData.questions.filter(
    (q, i) => parseInt(q.correctAnswer) === userAnswers[i]
  ).length;

  return (
    <div className="">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-lg mb-4">
          You got {correctAnswers} out of {quizData.questions.length} questions
          correct.
        </p>
        <div className="space-y-4">
          {quizData.questions.map((question, index) => (
            <div key={index} className="border-b pb-4">
              <p className="font-semibold">{question.question}</p>
              <p className="text-green-600">
                Correct answer:{" "}
                {question.options[parseInt(question.correctAnswer)]}
              </p>
              <p
                className={
                  userAnswers[index] === parseInt(question.correctAnswer)
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                Your answer: {question.options[userAnswers[index]]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
