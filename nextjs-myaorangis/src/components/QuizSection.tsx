"use client";
import { useState } from "react";

type Question = {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: "a" | "b" | "c" | "d";
};

export function QuizSection({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions?.length) return null;

  const score = questions.filter((q, i) => answers[i] === q.correct).length;

  return (
    <div className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-16">
      <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
        ✨ Now let's talk about the story
      </p>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-10">
        Read each question carefully — you've got this!
      </h2>

      <div className="space-y-10 max-w-2xl">
        {questions.map((q, i) => (
          <div key={i}>
            <p className="font-semibold text-gray-900 dark:text-white mb-4">
              {i + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {(["a", "b", "c", "d"] as const).map((opt) => {
                const isSelected = answers[i] === opt;
                const isCorrect = submitted && opt === q.correct;
                const isWrong = submitted && isSelected && opt !== q.correct;

                return (
                  <button
                    key={opt}
                    disabled={submitted}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [i]: opt }))
                    }
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors
                      ${isCorrect ? "bg-green-50 border-green-400 text-green-800 dark:bg-green-900/30 dark:text-green-300" : ""}
                      ${isWrong ? "bg-red-50 border-red-400 text-red-800 dark:bg-red-900/30 dark:text-red-300" : ""}
                      ${!isCorrect && !isWrong && isSelected ? "bg-indigo-50 border-indigo-400 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" : ""}
                      ${!isCorrect && !isWrong && !isSelected ? "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300" : ""}
                    `}
                  >
                    <span className="font-semibold uppercase mr-2">{opt}.</span>
                    {q[opt]}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="mt-10 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answers
        </button>
      ) : (
        <div className="mt-10 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-center">
          <p className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300">
            Your Score: {score} / {questions.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {score === questions.length
              ? "🌟 Perfect score!"
              : score >= questions.length / 2
                ? "Good job! Keep reading!"
                : "Keep practicing!"}
          </p>
        </div>
      )}
    </div>
  );
}
