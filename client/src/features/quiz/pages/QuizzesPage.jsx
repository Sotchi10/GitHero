import { useState } from "react";
import QuizGrid from "./QuizGrid";
import QuestionArea from "./QuestionArea";
import quizzesData from "../data/quizzesData";

function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-6 text-[#eff0e9]">
      <div className="flex w-full max-w-7xl flex-col gap-4 lg:grid lg:grid-cols-[560px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <QuizGrid
            quizzes={quizzesData}
            selectedId={selectedQuiz?.id}
            onSelect={setSelectedQuiz}
          />
        </div>

        <div className="lg:h-[calc(100vh-3rem)] lg:overflow-hidden">
          <QuestionArea key={selectedQuiz?.id || "empty"} quiz={selectedQuiz} />
        </div>
      </div>
    </div>
  );
}

export default QuizzesPage;