import { useState } from "react";
import QuizGrid from "./QuizGrid";
import QuestionArea from "./QuestionArea";
import quizzesData from "../data/quizzesData";

function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-[#111417] text-[#e8eaed] font-sans">
      
      {/* Topbar */}
      <div className="flex items-center px-5.5 py-3.25 border-b border-[#2a2d30] bg-[#0d0f10] shrink-0">
        <div className="flex items-center gap-2 text-[13px] text-[#555a60]">
          <span>GitHero</span>
          <span className="text-[#3a3f44]">›</span>
          <span>Quizzes</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0 p-5.5">
        <QuizGrid
          quizzes={quizzesData}
          selectedId={selectedQuiz?.id}
          onSelect={setSelectedQuiz}
        />

        <QuestionArea
          key={selectedQuiz?.id || "empty"}
          quiz={selectedQuiz}
        />
      </div>
    </div>
  );
}

export default QuizzesPage;