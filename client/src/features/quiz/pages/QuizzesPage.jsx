import { useState } from "react";
import QuizGrid from "./QuizGrid";
import QuestionArea from "./QuestionArea";
import quizzesData from "../data/quizzesData";

function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 dark:bg-[#080808] dark:text-[#141414]">
      <div className="flex w-full max-w-7xl flex-col gap-4 lg:grid lg:grid-cols-[560px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <QuizGrid
            quizzes={quizzesData}
            selectedId={selectedQuiz?.id}
            onSelect={setSelectedQuiz}
          />
        </div>
=======
    <div className="flex flex-1 px-6 flex-col min-h-screen text-[#e8eaed]">
      {/* Content */}
<<<<<<< HEAD
      <div className="flex flex-col gap-0 p-5.5">
        <QuizGrid
          quizzes={quizzesData}
          selectedId={selectedQuiz?.id}
          onSelect={setSelectedQuiz}
        />
      </div>
>>>>>>> f2a9bcab4362cf3db2b6f77b342368f09167d970
=======
>>>>>>> c80c81371d78870aa2dacc63d8c8570ff549f0de

      <div className="min-h-screen px-4 py-6 text-[#e8eaed]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <div className="flex flex-col gap-0 p-5.5">
            <QuizGrid
              quizzes={quizzesData}
              selectedId={selectedQuiz?.id}
              onSelect={setSelectedQuiz}
            />
          </div>

          <div className="px-5 lg:h-[calc(100vh-3rem)] lg:overflow-hidden">
            <QuestionArea
              key={selectedQuiz?.id || "empty"}
              quiz={selectedQuiz}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizzesPage;