import { useState } from "react";
import QuizGrid from "./QuizGrid";
import QuestionArea from "./QuestionArea";
import quizzesData from "../data/quizzesData";

function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="flex flex-1 flex-col min-h-screen text-[#e8eaed] font-sans">
      {/* Content */}
      <div className="flex flex-col gap-0 p-5.5">
        <QuizGrid
          quizzes={quizzesData}
          selectedId={selectedQuiz?.id}
          onSelect={setSelectedQuiz}
        />

        <QuestionArea key={selectedQuiz?.id || "empty"} quiz={selectedQuiz} />
      </div>
    </div>
  );
}

export default QuizzesPage;
