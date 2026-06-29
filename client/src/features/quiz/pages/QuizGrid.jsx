import QuizCard from "./QuizCard";

function QuizGrid({ quizzes, selectedId, onSelect }) {
  return (
    <div className="bg-[#161a1e] border border-[#2a2d30] rounded-xl p-5 mb-4.5">
      
      <div className="text-[13px] text-[#c5c8cc] mb-4">
        Test your knowledge here
      </div>

      <div className="grid grid-cols-4 gap-3">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            isSelected={selectedId === quiz.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizGrid;