import { useState } from "react";
import QuizGrid from "./QuizGrid";
import QuestionArea from "./QuestionArea";
import quizzesData from "../data/quizzesData";

function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="flex flex-1 px-6 flex-col min-h-screen text-[#e8eaed]">
      {/* Content */}
      <div className="flex flex-col gap-0 p-5.5">
        <QuizGrid
          quizzes={quizzesData}
          selectedId={selectedQuiz?.id}
          onSelect={setSelectedQuiz}
        />
      </div>

      <div className="min-h-screen bg-[#080808] px-4 py-6 text-[#e8eaed]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:grid lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <QuizGrid
              quizzes={quizzesData}
              selectedId={selectedQuiz?.id}
              onSelect={setSelectedQuiz}
            />
          </div>

          <div className="lg:h-[calc(100vh-3rem)] lg:overflow-hidden">
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
